This is frontend for Ctrl Play

Backend is built using Lua. Process ID for this project: E8gHiH6gpkfFZywTbQj13F9SUH8N9tWrFsgGisOPHV4 (Pulse Protocol. https://pulseprotocol.vercel.app/)

Frontend is in react and tailwind CSS

In lua process, each game is a POST in the pulse protocol on which comemnts can be made.

To do that, run

target = "E8gHiH6gpkfFZywTbQj13F9SUH8N9tWrFsgGisOPHV4"

Send({Target = target, Action = "SUBMIT_POST", Tags = {content= "Just Slide Remastered"}})
