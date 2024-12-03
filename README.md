Game rules:

- 17 cards, 4 players only. Each player gets 4 cards and 1 card (NULL CARD) is randomly given to a player.

Card status:

[lion, lion, lion ,lion tiger, tiger, tiger, tiger, dog, dog , dog, dog, cat, cat, cat, cat, NULL]

- The player who has 5 cards (4 cards + NULL CARD) starts passing the card. He can't pass NULL CARD AT FIRST.

- Player pass the card in clockwise direction. i.e, A -> B -> C -> D -> A

- A player who received a card right away cannot pass the same card to the next player in the same turn unless he has multiple cards of the same type.

- No player can know the card status of any other player.

- Game continues until at least one player has all 4 cards of the same type.

What each player gets if they collect all 4 cards of the same type:

LION: 1,000 coins
TIGER: 850 coins
DOG: 700 coins
CAT: 500 coins

The game also has a chatroom where people can chat just to speak lies and confuse other players.

# How i think the workflow would be on AO

State Variables:

```lua
-- this would store all the players address who have played this game and store their name and points earned to make a globalLeaderboard
MASTER_PLAYERS = {
    "AO_ADDRESS1": {
        "PLAYER_NAME": "player1",
        "POINTS_EARNED": 0,
    },
    "AO_ADDRESS2": {
        "PLAYER_NAME": "player2",
        "POINTS_EARNED": 0,
    },
    "AO_ADDRESS3": {
        "PLAYER_NAME": "player3",
        "POINTS_EARNED": 0,
    },
}

```

- Master player creates a chatroom that returns a password, using this password rest 3 players will join the room (in UI, they will not enter password but just hit a link like
  4cards.xyz/roomID/{password} and boom!). room ID could simply be a nounce or a counter that would be incremented every time a new room is created. (I am confused how would i do this, can there be multiple rooms in a ao process/chatroom? how would i acheieve that?)

- When all players are joined, the game starts.

- call assignCards() function that assigns cards to each player randomly (in a way so thhat no one can have any chances to win in move 1)

- from now on, i can simply add rules to the game handler about how cards will be moved, whose turn it is etc. (easy). One varible would store who chance is to pass the card, one map/dictionary would store the state of players with cards in this way:

```json
{
  "player1": ["lion", "tiger", "dog", "cat"],
  "player2": ["lion", "tiger", "dog", "cat"],
  "player3": ["lion", "tiger", "dog", "cat"],
  "player4": ["lion", "tiger", "dog", "cat"]
}
```

- after every legal move, i have to find if any player has all 4 cards of the same type, If yes, game ends and i update MASTER_PLAYERS

Database Structure

## RegisteredPlayers:

Address: Name

p1 "Aditya"
p2 "Rahul"

## GameRooms:

GameID: PlayersString: GameState: Result: Winner: PointGiven RoomPassword

1: p1, p2, p3, p4: "LOOKING FOR MEMBERS" | "ON-GOING" | "COMPLETED" NULL NULL NULL "password"

## GameID[#Index]: (temporary one which will be delted after game ends)

MoveNumber Player toPlayer CardPassed CardState  
0 NULL NULL NULL "11230, 2214, 4433, 2431"
1 p1 p2 3 "1130, 23214 , 4433, 2431"
2 p2 p3 2 "1130, 2314 , 44332, 2431"
...
...
...
10 p3 p4 4 "1113, "2221", "4444", "23330"

```lua

-- Global card value table
CARD_VALUE = {
    ["1"] = 1000,
    ["2"] = 850,
    ["3"] = 700,
    ["4"] = 500
}

-- Handler function to register a new player
function RegisterPlayer(msg, name)
    local address = msg.from
    -- Check if player is already registered
    local registered = isRegistered()

    if registered then
        return "Player already registered"
    else
        return string.format(
            "INSERT INTO RegisteredPlayers (address, name) VALUES ('%s', '%s');",
            address, name
        )
    end
end

-- Function to generate a random 5-letter password
function generatePassword()
    local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    local password = ""
    for i = 1, 5 do
        local randomIndex = math.random(1, #chars)
        password = password .. string.sub(chars, randomIndex, randomIndex)
    end
    return password
end

function


-- Handler function to create a new game room
function createGameRoom(msg)
    local address = msg.from
    -- Check if player is already registered
    local registered = isRegistered()

    if not registered then
        return "You need to be registered to create a game room"
    end

    local password = generatePassword()
    -- SQLite uses COALESCE and IFNULL differently than other DBs
    local biggestGameID = "SELECT COALESCE(MAX(GameID), 0) FROM GameRooms;"
    local newGameID = biggestGameID + 1

    return string.format(
        "INSERT INTO GameRooms (GameID, PlayersString, GameState, ROOM_PASSWORD) " ..
        "VALUES (%d, '%s', 'LOOKING FOR MEMBERS', '%s');",
        newGameID, address, password
    )
end

-- Handler function to join an existing room


function joinRoom(msg)

    gameID = msg.tags.gameID;
    password = msg.tags.password;

    local registered = isRegistered()
    if not registered then
        return "You need to be registered to join a game room"
    end

    -- check if gameID exists
    local gameExists = "SELECT * FROM GameRooms WHERE GameID = gameID";
    if not gameExists then
        return "Game does not exist";
    end

    local passwordOfGameRoom = string.format(
        "SELECT RoomPassword FROM GameRooms WHERE GameID = %d;",
        gameID
    )

    if passwordOfGameRoom ~= password then
        return "Invalid Password"
    end

    local players = string.format(
        "SELECT PlayerString FROM GameRooms WHERE GameID = %d;",
        gameID
    )

    -- Get number of players currently in room
    local numberOfPlayers = select(2, string.gsub(players, ",", ",")) + 1

    if numberOfPlayers == 4 then
        return "Room is full"
    end

    -- SQLite uses || for string concatenation in queries
    local newPlayers = string.format(
        "SELECT PlayersString || ', ' || '%s' FROM GameRooms WHERE GameID = %d;",
        msg.from, gameID
    )

    if numberOfPlayers == 3 then
        -- create new table named `Game_{gameID}` to store game moves

        admin:exec([[
            CREATE TABLE IF NOT EXISTS Game_1 (
                MoveNumber INTEGER PRIMARY KEY AUTOINCREMENT,
                Player TEXT CHECK(length(Player) <= 50),
                toPlayer TEXT CHECK(length(toPlayer) <= 50),
                CardPassed INTEGER CHECK(CardPassed BETWEEN 1 AND 4),
                CardState TEXT CHECK(length(CardState) <= 50)
            );


            INSERT INTO sqlite_sequence (name, seq) VALUES ('Game_1', -1);
]])        

        cardState = CreateCardState()

        admin:exec(string.format(
            "INSERT INTO Game_%d (MoveNumber, Player, toPlayer, CardPassed, CardState) " ..
            "VALUES (0, NULL, NULL, NULL, '%s');",
            gameID, cardState
        ))
        execute(query)

        
        return "Game Has Begun!"
    else
        return string.format(
            "UPDATE GameRooms SET PlayersString = '%s' WHERE GameID = %d;",
            newPlayers, gameID
        )
    end
end

-- Function to get room status
function getRoomStatus(roomID)
    -- SQLite specific way to select all columns except one
    local query = string.format(
        "SELECT GameID, PlayersString, GameState, Result, Winner, PointGiven " ..
        "FROM GameRooms WHERE GameID = %d;",
        roomID
    )
    local allData = execute(query)
    return allData
end

-- Function to distribute cards
function distributeCards(gameID)
    local cardState = getInitialCardState()

    -- SQLite table names can't use square brackets, using proper table naming
    local query = string.format(
        "INSERT INTO Game_%d (MoveNumber, Player, toPlayer, CardPassed, CardState) " ..
        "VALUES (0, NULL, NULL, NULL, '%s');",
        gameID, cardState
    )
    execute(query)
end

-- Handler function for passing cards
function passCard(msg, gameID, password, cardNumber)
    local address = msg.Address
    local isRegistered = isRegistered(address)
    if not isRegistered then
        return "You need to be registered to play the game"
    end

    local roomInfo = getRoomStatus(gameID)
    local gameState = roomInfo["GameState"]

    if gameState ~= "ON-GOING" then
        return "Game is not on-going"
    end

    local players = roomInfo["PlayersString"]

    -- Check if player is in game
    local playerFound = false
    for player in string.gmatch(players, "[^,]+") do
        if player == msg.from then
            playerFound = true
            break
        end
    end
    if not playerFound then
        return "You are not a part of this game"
    end

    -- Get last move (SQLite specific LIMIT syntax)
    local query = string.format(
        "SELECT * FROM Game_%d ORDER BY MoveNumber DESC LIMIT 1;",
        gameID
    )
    local lastInsertedMove = execute(query)
    local CardState = lastInsertedMove["CardState"]

    -- Parse card state into table
    local listCardState = {}
    for card in string.gmatch(CardState, "[^,]+") do
        table.insert(listCardState, card)
    end

    -- Create player-cards mapping
    local tempPlayer = {}
    for i = 1, 4 do
        local player = string.match(players, "[^,]+", i)
        tempPlayer[player] = listCardState[i]
    end

    -- Find which player's turn it is
    local whichPlayerMove = nil
    for player, cards in pairs(tempPlayer) do
        if #cards == 5 then
            whichPlayerMove = player
            break
        end
    end

    if msg.from ~= whichPlayerMove then
        return "It's not your turn"
    end

    -- Get valid cards for current player
    local validCardsToMove = tempPlayer[msg.from]
    local validCardsToMoveList = {}
    for c in string.gmatch(validCardsToMove, ".") do
        table.insert(validCardsToMoveList, c)
    end

    local currentMoveNumber = lastInsertedMove["MoveNumber"]

    -- if it is first move of game
    if currentMoveNumber == 1 then
        for i, card in ipairs(validCardsToMoveList) do
            if card == '0' then
                table.remove(validCardsToMoveList, i)
                break
            end
        end
    else
        -- Check previous card passed to current player (SQLite specific query)
        local query = string.format(
            "SELECT * FROM Game_%d WHERE toPlayer = '%s' " ..
            "ORDER BY MoveNumber DESC LIMIT 1;",
            gameID, msg.from
        )
        local value = execute(query)

        if value then
            local cardPassed = value["CardPassed"]
            for i, card in ipairs(validCardsToMoveList) do
                if card == cardPassed then
                    table.remove(validCardsToMoveList, i)
                    break
                end
            end
        end
    end

    -- Validate card number
    local validCard = false
    for _, card in ipairs(validCardsToMoveList) do
        if card == cardNumber then
            validCard = true
            break
        end
    end
    if not validCard then
        return "Can't pass this card"
    end

    -- Find next player (clockwise)
    local playersList = {}
    for player in string.gmatch(players, "[^,]+") do
        table.insert(playersList, player)
    end
    local toPlayer = nil
    for i, player in ipairs(playersList) do
        if player == msg.from then
            toPlayer = playersList[i % 4 + 1]
            break
        end
    end

    -- Update card states
    tempPlayer[msg.from] = string.gsub(tempPlayer[msg.from], cardNumber, "", 1)
    tempPlayer[toPlayer] = tempPlayer[toPlayer] .. cardNumber

    -- Create new card state string
    local newCardState = table.concat({
        tempPlayer[playersList[1]],
        tempPlayer[playersList[2]],
        tempPlayer[playersList[3]],
        tempPlayer[playersList[4]]
    }, ", ")

    local newMoveNumber = currentMoveNumber + 1

    -- Insert new move (SQLite specific table naming)
    local query = string.format(
        "INSERT INTO Game_%d (MoveNumber, Player, toPlayer, CardPassed, CardState) " ..
        "VALUES (%d, '%s', '%s', '%s', '%s');",
        gameID, newMoveNumber, msg.from, toPlayer, cardNumber, newCardState
    )
    execute(query)

    -- Check for winner
    for player, cards in pairs(tempPlayer) do
        if #cards == 4 then
            local allSame = true
            local firstCard = string.sub(cards, 1, 1)
            for i = 2, 4 do
                if string.sub(cards, i, i) ~= firstCard then
                    allSame = false
                    break
                end
            end

            if allSame then
                local pointsToGive = CARD_VALUE[firstCard]
                -- SQLite update syntax
                local query = string.format(
                    "UPDATE GameRooms SET " ..
                    "GameState = 'COMPLETED', " ..
                    "Result = 1, " ..
                    "Winner = '%s', " ..
                    "PointGiven = %d " ..
                    "WHERE GameID = %d;",
                    player, pointsToGive, gameID
                )
                execute(query)
                return string.format("Game Over! %s has won the game!", player)
            end
        end
    end

    return "Card Passed Successfully!"
end
```

# Handlers

handler function RegisterPlayer(msg, name){
address = msg.from; # check if player is already registered
registered = isRegistered();
if(registered){
return "Player already registered";
}
else{
"INSERT INTO RegisteredPlayers (address, name) VALUES (address, name)";
}

}

function generatePassword(){
random5LetterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
password = "";
for i in range(5){
password = password + random5LetterString[Math.floor(Math.random() * random5LetterString.length)];
}
}

handler function createGameRoom(msg){
address = msg.from; # check if player is already registered
registered = isRegistered();
if(!registered){
return "You need to be registered to create a game room";
}

    password = generatePassword() -- this returns 5 letter random string;

    biggestGameID = "SELECT MAX(GameID) FROM GameRooms";
    newGameID = biggestGameID + 1;






    return "INSERT INTO GameRooms (GameID, PlayersString, GameState, ROOM PASSWORD) VALUES (newGameID,  address, "LOOKING FOR MEMBERS", password)";

}

handler function joinRoom(msg, gameID, password){
registered = isRegistered();
if(!registered){
return "You need to be registered to join a game room";
}

    passwordOfGameRoom = "SELECT ROOM PASSWORD FROM GameRooms WHERE GameID = gameID";

    if (passwordOfGameRoom != password){
        return "Invalid Password";
    }

    players = "SELECT PlayersString FROM GameRooms WHERE GameID = gameID";

    #numberOfPlayersJoinedSoFar
    numberOfPlayers = players.split(",").length;
    if(numberOfPlayers == 4){
        return "Room is full";
    }

    if(numberOfPlyers == 3){
        players = players + ", " + msg.from;
        # add players and change gameState to Ongoing
        execute "UPDATE GameRooms SET PlayersString = players, GameState = "ON-GOING" WHERE GameID = gameID";


        distributeCards(gameID)

        return "Game Has Begun!"



    }
    else{
        newPlayers = players + ", " + msg.from;
        return "UPDATE GameRooms SET PlayersString = newPlayers WHERE GameID = gameID";
    }

}

functionGetRoomStatus(roomID){ # return everthing except the password
allData = "SELECT \* FROM GameRooms WHERE GameID = roomID"; # remove password from allData
allData.pop("ROOM PASSWORD");
return allData;
}

function distributeCards(GameID){

    cardState = getInitialCardState(); # this function just returns the required string as per db and all cards are random in a way that doesn't make someone win easily;

    execute "INSERT INTO GameID[roomInfo.GameID] (MoveNumber, Player, toPlayer, CardPassed, CardState) VALUES (0, NULL, NULL, NULL, cardState)";

}

global CARD_VALUE = {
"1": 1000,
"2": 850,
"3": 700,
"4": 500
}

handler function passCard(msg, gameID, password, cardNumber){
address = msg.Address
isRegistered = isRegistered(address);
if(!isRegistered){
return "You need to be registered to play the game";
}

    roomInfo = getRoomStatus(gameID);

    gameState = roomInfo["GameState"];
    if(gameState != "ON-GOING"){
        return "Game is not on-going";
    }

    players = roomInfo["PlayersString"];

    if(msg.from not in players){
        return "You are not a part of this game";
    }

    lastInsertedMove = "SELECT * FROM GameID[gameID] ORDER BY MoveNumber DESC LIMIT 1";

    CardState = lastInsertedMove["CardState"];

    listCardState = CardState.split(",");

    tempPlayer = {players[0]: listCardState[0], players[1]: listCardState[1], player[2]: listCardState[2], players[3]: listCardState[3]};


    whichPlayerMove = "";
    for player in tempPlayer:
        lengthOfList = len(tempPlayer[player]);

        if lengthOfList ===5 :
            whichPlayerMove = player;
            break;


    if(msg.from != whichPlayerMove){
        return "It's not your turn";
    }

    validCardsToMove = tempPlayer[msg.from];

    validCardsToMoveList = validCardsToMove.split("");  ['1', '1', '2', '3', '0']

    currentMoveNumber = lastInsertedMove["MoveNumber"];

    if(currentMoveNumber == 0){
        if('0' in validCardsToMoveList){
            validCardsToMoveList.remove('0');
        }
    }
    else{

         ## NOW IN gameID[gameID] table, select the last inserted row where msg.From is there in toPlayer;

         value = execute "SELECT * FROM GameID[gameID] WHERE toPlayer = msg.From ORDER BY MoveNumber DESC LIMIT 1";

        if(value != NULL){
            cardPassed = value["CardPassed"];
            if(cardPassed in validCardsToMoveList){
                validCardsToMoveList.remove(cardPassed);
            }
        }

    }

    if(cardNumber not in validCardsToMoveList){
        return "Can't pass this card";
    }

    # find toPlayer, it will be in clockwise, that is, p1 -> p2 -> p3 -> p4 -> p1 (only 4 players are there max)
    toPlayer = "";
    totalPlayers = 4;
    for i in range(totalPlayers):
        if(players[i] == msg.from):
            toPlayer = players[(i+1)%totalPlayers];
            break;



    tempPlayer[msg.from] = tempPlayer[msg.from].replace(cardNumber, "");
    tempPlayer[toPlayer] = tempPlayer[toPlayer] + cardNumber;

    newCardState = tempPlayer["p1"] + ", " + tempPlayer["p2"] + ", " + tempPlayer["p3"] + ", " + tempPlayer["p4"];

    newMoveNumber = currentMoveNumber + 1;

    execute "INSERT INTO GameID[gameID] (MoveNumber, Player, toPlayer, CardPassed, CardState) VALUES (newMoveNumber, msg.from, toPlayer, cardNumber, newCardState)";

    #check if any of the player has 4 same cards in newCardState, if yes, update  and update GameRooms to COMPLETED

    for players in tempPlayers{
        cardState = tempPlayers[players];
        cardStateList = cardState.split("");
        if(cardStateList[0] == cardStateList[1] == cardStateList[2] == cardStateList[3]){

            pointsToGive = CARD_VALUE[cardStateList[0]];
            # update GameRooms
            execute "UPDATE GameRooms SET GameState = "COMPLETED", Result = 1, Winner = players, PointGiven =pointsToGive";

            return "Game Over! " + players + " has won the game!";
        }
    }

    return "Card Passed Successfully!";

}
