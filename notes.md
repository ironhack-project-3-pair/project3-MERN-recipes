// 😀 (U+1F600) is matched by \p{Emoji} and \p{Extended_Pictographic} and \p{Emoji_Presentation}
// ☺ (U+263A) is matched by \p{Emoji} \p{Extended_Pictographic} but not by \p{Emoji_Presentation}
// https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript/64007175#64007175
// https://unicode.org/Public/emoji/11.0/emoji-data.txt
// 0123456789#* and other characters are officially Emojis too
// https://stackoverflow.com/questions/70401560/what-is-the-difference-between-emoji-presentation-and-extended-pictographic/72727900#72727900
// UTS #51: Unicode Emoji - Unicode Technical Standard #51
// https://unicode.org/reports/tr51/
// U+1F600 is a code point
// it uses two UTF-16 code units (high and low surrogate) (js returns length of 2)
