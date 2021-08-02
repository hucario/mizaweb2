export type numberStoredAsString = string;

export type mizaCommand = {
	aliases: string[],
	description: string,
	usage: string,
	level: numberStoredAsString,
	rate_limit: numberStoredAsString,
	timeout: numberStoredAsString
}

export type helpJSONStruc = {
	[category: string]: {
		[commandName: string]: mizaCommand
	}
}
const commands: helpJSONStruc = {
    "MAIN": {
        "Help": {
            "aliases": [
                "\u2753",
                "\u2754",
                "?",
                "Help"
            ],
            "description": "Shows a list of usable commands, or gives a detailed description of a command.",
            "usage": "<(command|category)>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Hello": {
            "aliases": [
                "\ud83d\udc4b",
                "Hi",
                "Hi!",
                "Hewwo",
                "Herro",
                "'sup",
                "Hey",
                "Greetings",
                "Welcome",
                "Bye",
                "Cya",
                "Goodbye",
                "Hello"
            ],
            "description": "Sends a greeting message. Useful for checking whether the bot is online.",
            "usage": "<user>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Perms": {
            "aliases": [
                "DefaultPerms",
                "ChangePerms",
                "Perm",
                "ChangePerm",
                "Permissions",
                "Perms"
            ],
            "description": "Shows or changes a user's permission level.",
            "usage": "<0:users>* <1:new_level>? <default{?d}>? <hide{?h}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "EnabledCommands": {
            "aliases": [
                "EC",
                "Enable",
                "EnabledCommands"
            ],
            "description": "Shows, enables, or disables a command category in the current channel.",
            "usage": "(enable|disable)? <category>? <list{?l}>? <hide{?h}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Prefix": {
            "aliases": [
                "ChangePrefix",
                "Prefix"
            ],
            "description": "Shows or changes the prefix for Miza's commands for this server.",
            "usage": "<new_prefix>? <default{?d}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Loop": {
            "aliases": [
                "For",
                "Rep",
                "While",
                "Loop"
            ],
            "description": "Loops a command.",
            "usage": "<0:iterations> <1:command>+",
            "level": "1",
            "rate_limit": "(3, 7)",
            "timeout": "288"
        },
        "Avatar": {
            "aliases": [
                "PFP",
                "Icon",
                "Avatar"
            ],
            "description": "Sends a link to the avatar of a user or server.",
            "usage": "<objects>*",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Info": {
            "aliases": [
                "\ud83d\udd0d",
                "\ud83d\udd0e",
                "UserInfo",
                "ServerInfo",
                "WhoIs",
                "Info"
            ],
            "description": "Shows information about the target user or server.",
            "usage": "<objects>* <verbose{?v}>?",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Profile": {
            "aliases": [
                "User",
                "UserProfile",
                "Profile"
            ],
            "description": "Shows or edits a user profile on Miza.",
            "usage": "(user|description|timezone|birthday)? <value>? <delete{?d}>?",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Activity": {
            "aliases": [
                "Recent",
                "Log",
                "Activity"
            ],
            "description": "Shows recent Discord activity for the targeted user, server, or channel.",
            "usage": "<user>? <verbose{?v}>?",
            "level": "0",
            "rate_limit": "(2, 9)",
            "timeout": "24"
        },
        "Status": {
            "aliases": [
                "State",
                "Ping",
                "Status"
            ],
            "description": "Shows the bot's current internal program state.",
            "usage": "(enable|disable)?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Invite": {
            "aliases": [
                "Website",
                "BotInfo",
                "InviteLink",
                "Invite"
            ],
            "description": "Sends a link to Miza's homepage, github and invite code, as well as an invite link to the current server if applicable.",
            "usage": "",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Upload": {
            "aliases": [
                "Filehost",
                "Upload"
            ],
            "description": "Sends a link to Miza's webserver's upload page: https://mizabot.xyz/upload",
            "usage": "",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Reminder": {
            "aliases": [
                "Announcement",
                "Announcements",
                "Announce",
                "RemindMe",
                "Reminders",
                "Remind",
                "Reminder"
            ],
            "description": "Sets a reminder for a certain date and time.",
            "usage": "<1:message>? <0:time>? <urgent{?u}>? <delete{?d}>?",
            "level": "0",
            "rate_limit": "(0.3333333333333333, 4)",
            "timeout": "24"
        }
    },
    "STRING": {
        "Translate": {
            "aliases": [
                "TR",
                "Translate"
            ],
            "description": "Translates a string into another language.",
            "usage": "<0:language> <1:string> <verbose{?v}>? <papago{?p}>?",
            "level": "0",
            "rate_limit": "(2, 7)",
            "timeout": "24"
        },
        "Math": {
            "aliases": [
                "\ud83d\udd22",
                "M",
                "PY",
                "Sympy",
                "Plot",
                "Calc",
                "Plot3d",
                "Math"
            ],
            "description": "Evaluates a math formula.",
            "usage": "<string> <verbose{?v}>? <rationalize{?r}>? <show_variables{?l}>? <clear_variables{?c}>?",
            "level": "0",
            "rate_limit": "(0.5, 5)",
            "timeout": "96"
        },
        "Uni2Hex": {
            "aliases": [
                "U2H",
                "HexEncode",
                "Uni2Hex"
            ],
            "description": "Converts unicode text to hexadecimal numbers.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Hex2Uni": {
            "aliases": [
                "H2U",
                "HexDecode",
                "Hex2Uni"
            ],
            "description": "Converts hexadecimal numbers to unicode text.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "ID2Time": {
            "aliases": [
                "I2T",
                "CreateTime",
                "Timestamp",
                "ID2Time"
            ],
            "description": "Converts a discord ID to its corresponding UTC time.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Time2ID": {
            "aliases": [
                "T2I",
                "RTimestamp",
                "Time2ID"
            ],
            "description": "Converts a UTC time to its corresponding discord ID.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "SHA256": {
            "aliases": [
                "SHA",
                "SHA256"
            ],
            "description": "Computes the SHA256 hash of a string.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Fancy": {
            "aliases": [
                "FancyText",
                "Fancy"
            ],
            "description": "Creates translations of a string using unicode fonts.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Zalgo": {
            "aliases": [
                "Chaos",
                "ZalgoText",
                "Zalgo"
            ],
            "description": "Generates random combining accent symbols between characters in a string.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Format": {
            "aliases": [
                "FormatText",
                "Format"
            ],
            "description": "Creates neatly fomatted text using combining unicode characters.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "UnFancy": {
            "aliases": [
                "UnFormat",
                "UnZalgo",
                "UnFancy"
            ],
            "description": "Removes unicode formatting and diacritic characters from inputted text.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "OwOify": {
            "aliases": [
                "UwU",
                "OwO",
                "UwUify",
                "OwOify"
            ],
            "description": "Applies the owo/uwu text filter to a string.",
            "usage": "<string> <aggressive{?a}>? <basic{?b}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "AltCaps": {
            "aliases": [
                "AltCaps"
            ],
            "description": "Alternates the capitalization on characters in a string.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Say": {
            "aliases": [
                "Say"
            ],
            "description": "Repeats a message that the user provides.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Char2Emoji": {
            "aliases": [
                "C2E",
                "Char2Emoji"
            ],
            "description": "Makes emoji blocks using a string.",
            "usage": "<0:string> <1:emoji_1> <2:emoji_2>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Time": {
            "aliases": [
                "\ud83d\udd70\ufe0f",
                "\u23f0",
                "\u23f2\ufe0f",
                "UTC",
                "GMT",
                "T",
                "EstimateTime",
                "EstimateTimezone",
                "Time"
            ],
            "description": "Shows the current time at a certain GMT/UTC offset, or the current time for a user. Be sure to check out https://mizabot.xyz/time!",
            "usage": "<offset_hours|user>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Timezone": {
            "aliases": [
                "Timezone"
            ],
            "description": "Shows the current time in a certain timezone. Be sure to check out https://mizabot.xyz/time!",
            "usage": "<timezone> <list{?l}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "TimeCalc": {
            "aliases": [
                "TimeDifference",
                "TimeDiff",
                "TimeSum",
                "TimeAdd",
                "TimeCalc"
            ],
            "description": "Computes the sum or difference between two times, or the Unix timestamp of a datetime string.",
            "usage": "<0:time1> [|,] <1:time2>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Identify": {
            "aliases": [
                "\ud83d\udcc2",
                "Magic",
                "Mime",
                "FileType",
                "Identify"
            ],
            "description": "Detects the type, mime, and optionally details of an input file.",
            "usage": "<url>*",
            "level": "0",
            "rate_limit": "(2, 7)",
            "timeout": "24"
        },
        "Follow": {
            "aliases": [
                "\ud83d\udeb6",
                "Follow_URL",
                "Redirect",
                "Follow"
            ],
            "description": "Follows a discord message link and/or finds URLs in a string.",
            "usage": "<url>*",
            "level": "0",
            "rate_limit": "(1, 5)",
            "timeout": "24"
        },
        "Match": {
            "aliases": [
                "RE",
                "RegEx",
                "RexExp",
                "GREP",
                "Match"
            ],
            "description": "matches two strings using Linux-style RegExp, or computes the match ratio of two strings.",
            "usage": "<0:string1> <1:string2>?",
            "level": "0",
            "rate_limit": "(0.5, 2)",
            "timeout": "24"
        },
        "Ask": {
            "aliases": [
                "How",
                "Ask"
            ],
            "description": "Ask me any question, and I'll answer it!",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "(0.5, 1)",
            "timeout": "24"
        },
        "Random": {
            "aliases": [
                "Random"
            ],
            "description": "Randomizes a set of arguments.",
            "usage": "<string>+",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Topic": {
            "aliases": [
                "Question",
                "Topic"
            ],
            "description": "Asks a random question.",
            "usage": "<relationship{?r}>? <pickup-line{?p}>? <nsfw-pickup-line{?n}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Urban": {
            "aliases": [
                "\ud83d\udcd6",
                "UrbanDictionary",
                "Urban"
            ],
            "description": "Searches Urban Dictionary for an item.",
            "usage": "<string> <verbose{?v}>*",
            "level": "0",
            "rate_limit": "(2, 8)",
            "timeout": "24"
        }
    },
    "ADMIN": {
        "Purge": {
            "aliases": [
                "\ud83d\uddd1",
                "Del",
                "Delete",
                "Purge_Range",
                "Purge"
            ],
            "description": "Deletes a number of messages from a certain user in current channel.",
            "usage": "<1:users(bots)|?a>? <0:count(1)>? <ignore{?i}|range{?r}|hide{?h}>*",
            "level": "3",
            "rate_limit": "(2, 4)",
            "timeout": "384"
        },
        "Mute": {
            "aliases": [
                "\ud83d\udd07",
                "Revoke",
                "Silence",
                "UnMute",
                "Mute"
            ],
            "description": "Mutes a user for a certain amount of time, with an optional reason.",
            "usage": "<0:users>* <1:time>? (reason)? <2:reason>? <hide{?h}>?",
            "level": "3",
            "rate_limit": "(2, 5)",
            "timeout": "384"
        },
        "Ban": {
            "aliases": [
                "\ud83d\udd28",
                "Bans",
                "Unban",
                "Ban"
            ],
            "description": "Bans a user for a certain amount of time, with an optional reason.",
            "usage": "<0:users>* <1:time>? (reason)? <2:reason>? <hide{?h}>?",
            "level": "3",
            "rate_limit": "(2, 5)",
            "timeout": "384"
        },
        "RoleSelect": {
            "aliases": [
                "ReactionRoles",
                "RoleButtons",
                "RoleSelection",
                "RoleSelector",
                "RoleSelect"
            ],
            "description": "Creates a message that allows users to self-assign roles from a specified list.",
            "usage": "<roles>+",
            "level": "3",
            "rate_limit": "(1, 2)",
            "timeout": "24"
        },
        "RoleGiver": {
            "aliases": [
                "Verifier",
                "RoleGiver"
            ],
            "description": "Adds an automated role giver to the current channel.",
            "usage": "<0:react_to>? <1:role>? <delete_messages{?x}>? <disable{?d}>?",
            "level": "3",
            "rate_limit": "(2, 4)",
            "timeout": "24"
        },
        "AutoRole": {
            "aliases": [
                "InstaRole",
                "AutoRole"
            ],
            "description": "Causes any new user joining the server to automatically gain the targeted role. Input multiple roles to create a randomized role giver.",
            "usage": "<role>? <update_all{?x}>? <disable{?d}>?",
            "level": "3",
            "rate_limit": "1",
            "timeout": "288"
        },
        "RolePreserver": {
            "aliases": [
                "\ud83d\udd75\ufe0f",
                "StickyRoles",
                "RolePreserver"
            ],
            "description": "Causes Miza to save roles for all users, and re-add them when they leave and rejoin.",
            "usage": "(enable|disable)?",
            "level": "3",
            "rate_limit": "0",
            "timeout": "24"
        },
        "NickPreserver": {
            "aliases": [
                "StickyNicks",
                "NicknamePreserver",
                "NickPreserver"
            ],
            "description": "Causes Miza to save nicknames for all users, and re-add them when they leave and rejoin.",
            "usage": "(enable|disable)?",
            "level": "3",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Lockdown": {
            "aliases": [
                "\ud83d\udd12",
                "\u2623\ufe0f",
                "Lockdown"
            ],
            "description": "Completely locks down the server by removing send message permissions for all users and revoking all invites.",
            "usage": "",
            "level": "inf",
            "rate_limit": "30",
            "timeout": "384"
        },
        "SaveChannel": {
            "aliases": [
                "BackupChannel",
                "DownloadChannel",
                "SaveChannel"
            ],
            "description": "Saves a number of messages in a channel, as well as their contents, to a .txt file.",
            "usage": "<0:channel>? <1:message_limit(4096)>?",
            "level": "3",
            "rate_limit": "0",
            "timeout": "384"
        },
        "UserLog": {
            "aliases": [
                "MemberLog",
                "UserLog"
            ],
            "description": "Causes Miza to log user and member events from the server, in the current channel.",
            "usage": "(enable|disable)?",
            "level": "3",
            "rate_limit": "1",
            "timeout": "24"
        },
        "MessageLog": {
            "aliases": [
                "MessageLog"
            ],
            "description": "Causes Miza to log message events from the server, in the current channel.",
            "usage": "(enable|disable)?",
            "level": "3",
            "rate_limit": "1",
            "timeout": "24"
        },
        "FileLog": {
            "aliases": [
                "FileLog"
            ],
            "description": "Causes Miza to log deleted files from the server, in the current channel.",
            "usage": "(enable|disable)?",
            "level": "3",
            "rate_limit": "1",
            "timeout": "24"
        },
        "StarBoard": {
            "aliases": [
                "StarBoard"
            ],
            "description": "Causes Miza to repost popular messages with a certain number of a specified reaction anywhere from the server, into the current channel.",
            "usage": "<0:reaction> <1:react_count(1)>? <disable{?d}>?",
            "level": "2",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Crosspost": {
            "aliases": [
                "Repost",
                "Subscribe",
                "Crosspost"
            ],
            "description": "Causes Miza to automatically crosspost all messages from the target channel, into the current channel.",
            "usage": "<channel> <disable{?d}>?",
            "level": "3",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Publish": {
            "aliases": [
                "News",
                "AutoPublish",
                "Publish"
            ],
            "description": "Causes Miza to automatically publish all posted messages in the current channel.",
            "usage": "(enable|disable)? <force{?x}>?",
            "level": "3",
            "rate_limit": "1",
            "timeout": "24"
        },
        "AutoEmoji": {
            "aliases": [
                "NQN",
                "Emojis",
                "AutoEmoji"
            ],
            "description": "Causes all failed emojis starting and ending with : to be deleted and reposted with a webhook, when possible.",
            "usage": "(enable|disable)?",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "CreateEmoji": {
            "aliases": [
                "EmojiCreate",
                "EmojiCopy",
                "CopyEmoji",
                "Emoji",
                "CreateEmoji"
            ],
            "description": "Creates a custom emoji from a URL or attached file.",
            "usage": "<1:name>+ <0:url>",
            "level": "2",
            "rate_limit": "(3, 6)",
            "timeout": "72"
        },
        "ScanEmoji": {
            "aliases": [
                "EmojiScan",
                "ScanEmojis",
                "ScanEmoji"
            ],
            "description": "Scans all the emojis in the current server for potential issues.",
            "usage": "<count(inf)>",
            "level": "1",
            "rate_limit": "(4, 7)",
            "timeout": "96"
        }
    },
    "VOICE": {
        "Queue": {
            "aliases": [
                "\u25b6\ufe0f",
                "P",
                "Q",
                "Play",
                "Enqueue",
                "LS",
                "Queue"
            ],
            "description": "Shows the music queue, or plays a song in voice.",
            "usage": "<search_links>* <force{?f}|budge{?b}|random{?r}|verbose{?v}|hide{?h}>*",
            "level": "0",
            "rate_limit": "(0.5, 3)",
            "timeout": "48"
        },
        "Playlist": {
            "aliases": [
                "DefaultPlaylist",
                "PL",
                "Playlist"
            ],
            "description": "Shows, appends, or removes from the default playlist.",
            "usage": "(add|remove)? <search_links>*",
            "level": "0",
            "rate_limit": "0.5",
            "timeout": "24"
        },
        "Connect": {
            "aliases": [
                "\ud83d\udcf2",
                "\ud83c\udfa4",
                "\ud83c\udfb5",
                "\ud83c\udfb6",
                "\ud83d\udcf4",
                "\ud83d\udcdb",
                "Summon",
                "Join",
                "DC",
                "Disconnect",
                "Leave",
                "Yeet",
                "Move",
                "Reconnect",
                "FuckOff",
                "Connect"
            ],
            "description": "Summons the bot into a voice channel.",
            "usage": "<channel>?",
            "level": "0",
            "rate_limit": "(3, 4)",
            "timeout": "24"
        },
        "Skip": {
            "aliases": [
                "\u23ed",
                "\ud83d\udeab",
                "S",
                "SK",
                "FS",
                "CQ",
                "ForceSkip",
                "Remove",
                "Rem",
                "ClearQueue",
                "Clear",
                "Skip"
            ],
            "description": "Removes an entry or range of entries from the voice channel queue.",
            "usage": "<queue_positions(0)>* <force{?f}|vote{?v}|hide{?h}>*",
            "level": "0",
            "rate_limit": "(0.5, 3)",
            "timeout": "24"
        },
        "Pause": {
            "aliases": [
                "\u23f8\ufe0f",
                "\u23ef\ufe0f",
                "\u23f9\ufe0f",
                "Resume",
                "Unpause",
                "Stop",
                "Pause"
            ],
            "description": "Pauses, stops, or resumes audio playing.",
            "usage": "<hide{?h}>?",
            "level": "0",
            "rate_limit": "(0.5, 3)",
            "timeout": "24"
        },
        "Seek": {
            "aliases": [
                "\u2194\ufe0f",
                "Replay",
                "Seek"
            ],
            "description": "Seeks to a position in the current audio file.",
            "usage": "<position(0)>? <hide{?h}>?",
            "level": "0",
            "rate_limit": "(0.5, 3)",
            "timeout": "24"
        },
        "Dump": {
            "aliases": [
                "Save",
                "Load",
                "Dujmp\u00f6",
                "Dump"
            ],
            "description": "Saves or loads the currently playing audio queue state.",
            "usage": "<data>? <append{?a}|song_positions{?x}|hide{?h}>*",
            "level": "0",
            "rate_limit": "(1, 2)",
            "timeout": "24"
        },
        "AudioSettings": {
            "aliases": [
                "Volume",
                "Speed",
                "Pitch",
                "Pan",
                "BassBoost",
                "Reverb",
                "Compressor",
                "Chorus",
                "NightCore",
                "Resample",
                "Bitrate",
                "LoopQueue",
                "Repeat",
                "ShuffleQueue",
                "Quiet",
                "Stay",
                "Reset",
                "Audio",
                "A",
                "Vol",
                "V",
                "\ud83d\udd09",
                "\ud83d\udd0a",
                "\ud83d\udce2",
                "SP",
                "\u23e9",
                "rewind",
                "\u23ea",
                "PI",
                "\u2195\ufe0f",
                "PN",
                "BB",
                "\ud83e\udd41",
                "RV",
                "\ud83d\udcc9",
                "CO",
                "\ud83d\udddc",
                "CH",
                "\ud83d\udcca",
                "NC",
                "Rate",
                "BPS",
                "BR",
                "LQ",
                "\ud83d\udd01",
                "LoopOne",
                "\ud83d\udd02",
                "L1",
                "SQ",
                "\ud83e\udd2b",
                "\ud83d\udd15",
                "24/7",
                "\u267b",
                "AudioSettings"
            ],
            "description": "Changes the current audio settings for this server.",
            "usage": "<value>? <volume(?v)|speed(?s)|pitch(?p)|pan(?e)|bassboost(?b)|reverb(?r)|compressor(?c)|chorus(?u)|nightcore(?n)|bitrate(?i)|loop(?l)|repeat(?1)|shuffle(?x)|quiet(?q)|stay(?t)|force_permanent(?f)|disable(?d)|hide(?h)>*",
            "level": "0",
            "rate_limit": "(0.5, 5)",
            "timeout": "24"
        },
        "Roll": {
            "aliases": [
                "\ud83d\udd04",
                "Jump",
                "Next",
                "Roll"
            ],
            "description": "Rotates the queue to the left by a certain amount of steps.",
            "usage": "<position>? <hide{?h}>?",
            "level": "0",
            "rate_limit": "(4, 9)",
            "timeout": "24"
        },
        "Shuffle": {
            "aliases": [
                "\ud83d\udd00",
                "Shuffle"
            ],
            "description": "Shuffles the audio queue.",
            "usage": "<force_full_shuffle{?f}|hide{?h}>*",
            "level": "0",
            "rate_limit": "(4, 9)",
            "timeout": "24"
        },
        "Reverse": {
            "aliases": [
                "Reverse"
            ],
            "description": "Reverses the audio queue direction.",
            "usage": "<hide{?h}>?",
            "level": "0",
            "rate_limit": "(4, 9)",
            "timeout": "24"
        },
        "UnmuteAll": {
            "aliases": [
                "UnmuteAll"
            ],
            "description": "Disables server mute/deafen for all members.",
            "usage": "<hide{?h}>?",
            "level": "3",
            "rate_limit": "10",
            "timeout": "24"
        },
        "VoiceNuke": {
            "aliases": [
                "\u2622\ufe0f",
                "VoiceNuke"
            ],
            "description": "Removes all users from voice channels in the current server.",
            "usage": "<hide{?h}>?",
            "level": "3",
            "rate_limit": "10",
            "timeout": "24"
        },
        "Radio": {
            "aliases": [
                "FM",
                "Radio"
            ],
            "description": "Searches for a radio station livestream on http://worldradiomap.com that can be played on Miza.",
            "usage": "<0:country>? <2:state>? <1:city>?",
            "level": "0",
            "rate_limit": "(2, 6)",
            "timeout": "24"
        },
        "Party": {
            "aliases": [
                "YTT",
                "Party"
            ],
            "description": "Generates an activity party link in the nearest voice channel!",
            "usage": "(poker|betrayal|youtube|fishington|chess)?",
            "level": "2",
            "rate_limit": "5",
            "timeout": "24"
        },
        "Lyrics": {
            "aliases": [
                "SongLyrics",
                "Lyrics"
            ],
            "description": "Searches genius.com for lyrics of a song.",
            "usage": "<search_link>* <verbose{?v}>?",
            "level": "0",
            "rate_limit": "(2, 6)",
            "timeout": "24"
        },
        "Download": {
            "aliases": [
                "\ud83d\udce5",
                "Search",
                "YTDL",
                "Youtube_DL",
                "AF",
                "AudioFilter",
                "Trim",
                "Concat",
                "Concatenate",
                "ConvertORG",
                "Org2xm",
                "Convert",
                "Download"
            ],
            "description": "Searches and/or downloads a song from a YouTube/SoundCloud query or audio file link.",
            "usage": "<0:search_links>* <trim{?t}>? <-3:trim_start|->? <-2:trim_end|->? <-1:out_format(mp4)>? <concatenate{?c}|remove_silence{?r}|apply_settings{?a}|verbose_search{?v}>*",
            "level": "0",
            "rate_limit": "(7, 16)",
            "timeout": "1800"
        }
    },
    "IMAGE": {
        "IMG": {
            "aliases": [
                "IMG"
            ],
            "description": "Sends an image in the current chat from a list.",
            "usage": "(add|delete)? <0:tags>* <1:url>? <verbose{?v}|delete{?x}|hide{?h}>?",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "ImageAdjust": {
            "aliases": [
                "Saturation",
                "Saturate",
                "Contrast",
                "Brightness",
                "Brighten",
                "Lighten",
                "Lightness",
                "Luminance",
                "Luminosity",
                "Sharpness",
                "Sharpen",
                "HueShift",
                "Hue",
                "Blur",
                "Gaussian",
                "ImageAdjust"
            ],
            "description": "Applies an adjustment filter to the supplied image.",
            "usage": "<0:url> <1:multiplier(2)>?",
            "level": "0",
            "rate_limit": "(2, 5)",
            "timeout": "72"
        },
        "ColourDeficiency": {
            "aliases": [
                "ColorBlind",
                "ColourBlind",
                "ColorBlindness",
                "ColourBlindness",
                "ColorDeficiency",
                "Protanopia",
                "Protanomaly",
                "Deuteranopia",
                "Deuteranomaly",
                "Tritanopia",
                "Tritanomaly",
                "Achromatopsia",
                "Achromatonomaly",
                "ColourDeficiency"
            ],
            "description": "Applies a colourblindness filter to the target image.",
            "usage": "<0:url> (protanopia|protanomaly|deuteranopia|deuteranomaly|tritanopia|tritanomaly|achromatopsia|achromatonomaly)? <1:ratio(0.9)>?",
            "level": "0",
            "rate_limit": "(3, 7)",
            "timeout": "84.0"
        },
        "Invert": {
            "aliases": [
                "Negate",
                "Invert"
            ],
            "description": "Inverts supplied image.",
            "usage": "<url>",
            "level": "0",
            "rate_limit": "(2, 4.5)",
            "timeout": "72"
        },
        "GreyScale": {
            "aliases": [
                "GrayScale",
                "GreyScale"
            ],
            "description": "Greyscales supplied image.",
            "usage": "<url>",
            "level": "0",
            "rate_limit": "(2, 4.5)",
            "timeout": "72"
        },
        "Laplacian": {
            "aliases": [
                "EdgeDetect",
                "Edges",
                "Laplacian"
            ],
            "description": "Applies the Laplacian edge-detect algorithm to the image.",
            "usage": "<url>",
            "level": "0",
            "rate_limit": "(2, 4.5)",
            "timeout": "72"
        },
        "ColourSpace": {
            "aliases": [
                "ColorSpace",
                "ColourSpace"
            ],
            "description": "Changes the colour space of the supplied image.",
            "usage": "<0:url> <2:source(rgb)>? <1:dest(hsv)>?",
            "level": "0",
            "rate_limit": "(3, 6.5)",
            "timeout": "96"
        },
        "Magik": {
            "aliases": [
                "Distort",
                "Magik"
            ],
            "description": "Applies the Magik image filter to supplied image.",
            "usage": "<0:url> <cell_count(7)>?",
            "level": "0",
            "rate_limit": "(3, 7)",
            "timeout": "96"
        },
        "Colour": {
            "aliases": [
                "RGB",
                "HSV",
                "HSL",
                "CMY",
                "LAB",
                "LUV",
                "XYZ",
                "Color",
                "Colour"
            ],
            "description": "Creates a 128x128 image filled with the target colour.",
            "usage": "<colour>",
            "level": "0",
            "rate_limit": "(1, 3)",
            "timeout": "24"
        },
        "Gradient": {
            "aliases": [
                "Gradient"
            ],
            "description": "Generates a gradient with a specific shape.",
            "usage": "(linear|radial|conical|spiral|polygon)? <0:count(1)>? <1:colour(white)>?",
            "level": "0",
            "rate_limit": "(2, 5)",
            "timeout": "24"
        },
        "Average": {
            "aliases": [
                "AverageColour",
                "Average"
            ],
            "description": "Computes the average pixel colour in RGB for the supplied image.",
            "usage": "<url>",
            "level": "0",
            "rate_limit": "(2, 6)",
            "timeout": "48"
        },
        "QR": {
            "aliases": [
                "RainbowQR",
                "QR"
            ],
            "description": "Creates a QR code image from an input string, optionally adding a rainbow swirl effect.",
            "usage": "<string>",
            "level": "0",
            "rate_limit": "(3, 7)",
            "timeout": "96"
        },
        "Rainbow": {
            "aliases": [
                "RainbowGIF",
                "Rainbow"
            ],
            "description": "Creates a .gif image from repeatedly hueshifting supplied image.",
            "usage": "<0:url> <1:duration(2)>?",
            "level": "0",
            "rate_limit": "(5, 12)",
            "timeout": "192"
        },
        "Scroll": {
            "aliases": [
                "Parallax",
                "Offset",
                "ScrollGIF",
                "Scroll"
            ],
            "description": "Creates a .gif image from repeatedly shifting supplied image in a specified direction.",
            "usage": "<0:url> <1:direction(left)>? <2:duration(2)>? <3:fps(25)>?",
            "level": "0",
            "rate_limit": "(5, 11)",
            "timeout": "192"
        },
        "Spin": {
            "aliases": [
                "SpinGIF",
                "Spin"
            ],
            "description": "Creates a .gif image from repeatedly rotating supplied image.",
            "usage": "<0:url> <1:duration(2)>?",
            "level": "0",
            "rate_limit": "(5, 11)",
            "timeout": "192"
        },
        "Orbit": {
            "aliases": [
                "Orbital",
                "Orbitals",
                "Orbit"
            ],
            "description": "Renders a ring of orbiting sprites of the supplied image.",
            "usage": "<0:url> <1:orbital_count(5)>? <2:duration(2)>?",
            "level": "0",
            "rate_limit": "(8, 19)",
            "timeout": "312"
        },
        "GMagik": {
            "aliases": [
                "MagikGIF",
                "GMagik"
            ],
            "description": "Repeatedly applies the Magik image filter to supplied image.",
            "usage": "<0:url> <cell_size(7)>?",
            "level": "0",
            "rate_limit": "(7, 13)",
            "timeout": "192"
        },
        "Liquefy": {
            "aliases": [
                "LiquidGIF",
                "Liquefy"
            ],
            "description": "Repeatedly applies slight distortion to supplied image.",
            "usage": "<0:url> <cell_count(32)>?",
            "level": "0",
            "rate_limit": "(7, 14)",
            "timeout": "192"
        },
        "CreateGIF": {
            "aliases": [
                "Animate",
                "GIF",
                "Frames",
                "ImageSequence",
                "CreateGIF"
            ],
            "description": "Combines multiple supplied images, and/or optionally a video, into an animated image, image sequence, or video.",
            "usage": "<0:url>+ <-2:framerate(16)>? <-1:format(gif)>?",
            "level": "0",
            "rate_limit": "(8, 24)",
            "timeout": "480"
        },
        "Resize": {
            "aliases": [
                "ImageScale",
                "Scale",
                "Rescale",
                "ImageResize",
                "Resize"
            ],
            "description": "Changes size of supplied image, using an optional scaling operation.",
            "usage": "<0:url> <1:x_multiplier(1)>? <2:y_multiplier(x)>? (nearest|linear|hamming|bicubic|lanczos|scale2x|crop|auto)?",
            "level": "0",
            "rate_limit": "(3, 6)",
            "timeout": "96"
        },
        "Rotate": {
            "aliases": [
                "Orientate",
                "Orientation",
                "Transpose",
                "Rotate"
            ],
            "description": "Rotates an image.",
            "usage": "<0:url> <1:angle(90)>?",
            "level": "0",
            "rate_limit": "(2, 5)",
            "timeout": "72"
        },
        "Fill": {
            "aliases": [
                "ImageFill",
                "FillChannel",
                "FillImage",
                "Fill"
            ],
            "description": "Fills an optional amount of channels in the target image with an optional value.",
            "usage": "<0:url> [rgbcmyhsva]* <-1:value(0)>?",
            "level": "0",
            "rate_limit": "(3, 6)",
            "timeout": "72"
        },
        "Blend": {
            "aliases": [
                "ImageBlend",
                "ImageOP",
                "Blend"
            ],
            "description": "Combines the two supplied images, using an optional blend operation.",
            "usage": "<0:url1> <1:url2> (normal|replace|add|sub|mul|div|mod|and|or|xor|nand|nor|xnor|difference|overlay|screen|soft|hard|lighten|darken|plusdarken|overflow|lighting|burn|linearburn|dodge|hue|sat|lum|colour|extract|merge)? <3:opacity(0.5|1)>?",
            "level": "0",
            "rate_limit": "(3, 8)",
            "timeout": "168"
        },
        "Waifu2x": {
            "aliases": [
                "Waifu2x"
            ],
            "description": "Resizes the target image using the popular Waifu2x AI algorithm.",
            "usage": "<url> <api{?a}>",
            "level": "0",
            "rate_limit": "(5, 10)",
            "timeout": "120"
        }
    },
    "FUN": {
        "Text2048": {
            "aliases": [
                "2048",
                "\ud83c\udfae",
                "Text2048"
            ],
            "description": "Plays a game of 2048 using reactions. Gained points are rewarded as gold.",
            "usage": "<0:dimension_sizes(4x4)>* <1:dimension_count(2)>? <public{?p}|special_tiles{?s}|insanity_mode{?i}|easy_mode{?e}>*",
            "level": "0",
            "rate_limit": "(3, 9)",
            "timeout": "24"
        },
        "SlotMachine": {
            "aliases": [
                "Slots",
                "SlotMachine"
            ],
            "description": "Plays a slot machine game. Costs gold to play, can yield gold and diamonds.",
            "usage": "<bet{50}>? <skip_animation{?s}>?",
            "level": "0",
            "rate_limit": "(5, 10)",
            "timeout": "24"
        },
        "Barter": {
            "aliases": [
                "Barter"
            ],
            "description": "Simulates a Minecraft Piglin barter. Uses gold ingots; see ~shop and ~bal for more!",
            "usage": "<amount>",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Uno": {
            "aliases": [
                "Uno"
            ],
            "description": "Play a game of UNO with me, or with friends!",
            "usage": "",
            "level": "0",
            "rate_limit": "2",
            "timeout": "24"
        },
        "Pay": {
            "aliases": [
                "GiveCoins",
                "GiveGold",
                "Pay"
            ],
            "description": "Pays a specified amount of coins to the target user.",
            "usage": "<0:user> <1:amount(1)>?",
            "level": "0",
            "rate_limit": "0.5",
            "timeout": "24"
        },
        "React": {
            "aliases": [
                "AutoReact",
                "React"
            ],
            "description": "Causes Miza to automatically assign a reaction to messages containing the substring.",
            "usage": "<0:react_to>? <1:react_data>? <disable{?d}>?",
            "level": "2",
            "rate_limit": "(1, 2)",
            "timeout": "24"
        },
        "EmojiList": {
            "aliases": [
                "EmojiList"
            ],
            "description": "Sets a custom alias for an emoji, usable by ~autoemoji.",
            "usage": "(add|delete)? <name> <id>",
            "level": "0",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Dogpile": {
            "aliases": [
                "Dogpile"
            ],
            "description": "Causes Miza to automatically imitate users when 3+ of the same messages are posted in a row. Grants XP and gold when triggered.",
            "usage": "(enable|disable)?",
            "level": "2",
            "rate_limit": "0.5",
            "timeout": "24"
        },
        "Daily": {
            "aliases": [
                "Quests",
                "Quest",
                "Tasks",
                "Challenges",
                "Dailies",
                "Daily"
            ],
            "description": "Shows your list of daily quests.",
            "usage": "",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Wallet": {
            "aliases": [
                "Level",
                "Bal",
                "Balance",
                "Wallet"
            ],
            "description": "Shows the target users' wallet.",
            "usage": "<users>*",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Shop": {
            "aliases": [
                "Shop"
            ],
            "description": "Displays the shop system, or purchases an item.",
            "usage": "<item[]>",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "MimicConfig": {
            "aliases": [
                "PluralConfig",
                "RPConfig",
                "MimicConfig"
            ],
            "description": "Modifies an existing webhook mimic's attributes.",
            "usage": "<0:mimic_id> (prefix|name|avatar|description|gender|birthday)? <1:new>?",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "Mimic": {
            "aliases": [
                "RolePlay",
                "Plural",
                "RP",
                "RPCreate",
                "Mimic"
            ],
            "description": "Spawns a webhook mimic with an optional username and icon URL, or lists all mimics with their respective prefixes. Mimics require permission level of 1 to invoke.",
            "usage": "<0:prefix>? <1:user|name>? <2:url[]>? <delete{?d}>?",
            "level": "0",
            "rate_limit": "(1, 2)",
            "timeout": "24"
        },
        "MimicSend": {
            "aliases": [
                "RPSend",
                "PluralSend",
                "MimicSend"
            ],
            "description": "Sends a message using a webhook mimic, to the target channel.",
            "usage": "<0:mimic> <1:channel> <2:string>",
            "level": "0",
            "rate_limit": "0.5",
            "timeout": "24"
        },
        "8Ball": {
            "aliases": [
                "\ud83c\udfb1",
                "8Ball"
            ],
            "description": "Pulls a random image from cdn.nekos.life/8ball, and embeds it.",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "Cat": {
            "aliases": [
                "\ud83d\udc31",
                "Meow",
                "Kitty",
                "Kitten",
                "Cat"
            ],
            "description": "Pulls a random image from thecatapi.com, api.alexflipnote.dev/cats, or cdn.nekos.life/meow, and embeds it. Be sure to check out https://mizabot.xyz/cats!",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "Dog": {
            "aliases": [
                "\ud83d\udc36",
                "Woof",
                "Doggy",
                "Doggo",
                "Puppy",
                "Puppo",
                "Dog"
            ],
            "description": "Pulls a random image from images.dog.ceo, api.alexflipnote.dev/dogs, or cdn.nekos.life/woof, and embeds it. Be sure to check out https://mizabot.xyz/dogs!",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "Muffin": {
            "aliases": [
                "\ud83e\uddc1",
                "Muffins",
                "Muffin"
            ],
            "description": "Muffin time! What more is there to say? :D",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "XKCD": {
            "aliases": [
                "XKCD"
            ],
            "description": "Pulls a random image from xkcd.com and embeds it.",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "Inspiro": {
            "aliases": [
                "InspiroBot",
                "Inspiro"
            ],
            "description": "Pulls a random image from inspirobot.me and embeds it.",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "Giphy": {
            "aliases": [
                "GIFSearch",
                "Giphy"
            ],
            "description": "Pulls a random image from a search on giphy.com using tags.",
            "usage": "<verbose{?v}>?",
            "level": "0",
            "rate_limit": "(0.05, 0.25)",
            "timeout": "24"
        },
        "Rickroll": {
            "aliases": [
                "Thumbnail",
                "FakeThumbnail",
                "FakeVideo",
                "Rickroll"
            ],
            "description": "Generates a link that embeds a thumbnail, but redirects to a separate YouTube video once played.",
            "usage": "<thumbnail>? <video>?",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        }
    },
    "OWNER": {
        "Reload": {
            "aliases": [
                "Unload",
                "Reload"
            ],
            "description": "Reloads a specified module.",
            "usage": "",
            "level": "nan",
            "rate_limit": "0",
            "timeout": "inf"
        },
        "Restart": {
            "aliases": [
                "Shutdown",
                "Reboot",
                "Restart"
            ],
            "description": "Restarts, reloads, or shuts down Miza, with an optional delay.",
            "usage": "<delay>?",
            "level": "nan",
            "rate_limit": "0",
            "timeout": "inf"
        },
        "Execute": {
            "aliases": [
                "Execute"
            ],
            "description": "Executes a command as other user(s), similar to the command's function in Minecraft.",
            "usage": "as <0:users>* run <1:command>+",
            "level": "nan",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Exec": {
            "aliases": [
                "Eval",
                "Exec"
            ],
            "description": "Causes all messages by the bot owner in the current channel to be executed as python code on Miza.",
            "usage": "(enable|disable)? <type(virtual)>?",
            "level": "nan",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Immortalise": {
            "aliases": [
                "Immortalize",
                "Immortalise"
            ],
            "description": "Immortalises a targeted webserver URL.",
            "usage": "<url>",
            "level": "nan",
            "rate_limit": "0",
            "timeout": "24"
        },
        "Suspend": {
            "aliases": [
                "Block",
                "Blacklist",
                "Suspend"
            ],
            "description": "Prevents a user from accessing Miza's commands. Overrides <perms>.",
            "usage": "<0:user> <disable(?d)>",
            "level": "nan",
            "rate_limit": "0",
            "timeout": "24"
        }
    },
    "NSFW": {
        "Neko": {
            "aliases": [
                "Nya",
                "Neko"
            ],
            "description": "Pulls a random image from nekos.life and embeds it.",
            "usage": "<tags(neko)>? <verbose{?v}|random{?r}|list{?l}>?",
            "level": "0",
            "rate_limit": "(0.05, 4)",
            "timeout": "24"
        },
        "Lewd": {
            "aliases": [
                "NSFW",
                "Lewd"
            ],
            "description": "Pulls a random image from a search on Rule34 and e621, and embeds it.",
            "usage": "<query> <verbose{?v}>?",
            "level": "1",
            "rate_limit": "(1, 6)",
            "timeout": "48"
        }
    },
    "MISC": {
        "CS_mem2flag": {
            "aliases": [
                "CS_m2f",
                "CS_mem2flag"
            ],
            "description": "Returns a sequence of Cave Story TSC commands to set a certain memory address to a certain value.",
            "usage": "<0:address> <1:value(1)>?",
            "level": "0",
            "rate_limit": "1",
            "timeout": "24"
        },
        "CS_hex2xml": {
            "aliases": [
                "CS_h2x",
                "CS_hex2xml"
            ],
            "description": "Converts a given Cave Story hex patch to an xml file readable by Booster's Lab.",
            "usage": "<hex_data>",
            "level": "0",
            "rate_limit": "(3, 5)",
            "timeout": "24"
        },
        "CS_npc": {
            "aliases": [
                "CS_npc"
            ],
            "description": "Searches the Cave Story NPC list for an NPC by name or ID.",
            "usage": "<query> <condensed{?c}>?",
            "level": "0",
            "rate_limit": "2",
            "timeout": "24"
        },
        "CS_tsc": {
            "aliases": [
                "CS_tsc"
            ],
            "description": "Searches the Cave Story OOB flags list for a memory variable.",
            "usage": "<query> <condensed{?c}>?",
            "level": "0",
            "rate_limit": "2",
            "timeout": "24"
        },
        "CS_mod": {
            "aliases": [
                "CS_search",
                "CS_mod"
            ],
            "description": "Searches the Doukutsu Club and Cave Story Tribute Site Forums for an item.",
            "usage": "<query>",
            "level": "0",
            "rate_limit": "(3, 7)",
            "timeout": "24"
        },
        "MathQuiz": {
            "aliases": [
                "MathTest",
                "MQ",
                "MathQuiz"
            ],
            "description": "Starts a math quiz in the current channel.",
            "usage": "(easy|hard)? <disable{?d}>?",
            "level": "1",
            "rate_limit": "3",
            "timeout": "24"
        },
        "Wav2Png": {
            "aliases": [
                "Png2Wav",
                "Png2Mp3",
                "Wav2Png"
            ],
            "description": "Runs wav2png on the input URL. See https://github.com/thomas-xin/Audio-Image-Converter for more info, or to run it yourself!",
            "usage": "<0:search_links>",
            "level": "0",
            "rate_limit": "(9, 30)",
            "timeout": "360"
        },
        "SpectralPulse": {
            "aliases": [
                "SpectralPulse"
            ],
            "description": "Runs SpectralPulse on the input URL. Operates on a global queue system. See https://github.com/thomas-xin/SpectralPulse for more info, or to run it yourself!",
            "usage": "<0:search_links>",
            "level": "0",
            "rate_limit": "(12, 60)",
            "timeout": "3600"
        },
        "DeviantArt": {
            "aliases": [
                "DeviantArt"
            ],
            "description": "Subscribes to a DeviantArt Gallery, reposting links to all new posts.",
            "usage": "(add|remove)? <url> <reversed{?r}>?",
            "level": "2",
            "rate_limit": "4",
            "timeout": "24"
        }
    }
}

export default commands;