const keyEnums = Object.freeze({
    _ESC: {key: "{escape}", red: 433, green: 589, blue: 741},
    _F1: {key: "{f1}", red: 415, green: 567, blue: 723},
    _F2: {key: "{f2}", red: 406, green: 558, blue: 714},
    _F3: {key: "{f3}", red: 397, green: 549, blue: 701},
    _F4: {key: "{f4}", red: 402, green: 554, blue: 710},
    _F5: {key: "{f5}", red: 388, green: 540, blue: 692},
    _F6: {key: "{f6}", red: 393, green: 545, blue: 697},
    _F7: {key: "{f7}", red: 482, green: 634, blue: 790},
    _F8: {key: "{f8}", red: 487, green: 639, blue: 795},
    _F9: {key: "{f9}", red: 469, green: 621, blue: 777},
    _F10: {key: "{f10}", red: 455, green: 607, blue: 759},
    _F11: {key: "{f11}", red: 460, green: 612, blue: 764},
    _F12: {key: "{f12}", red: 442, green: 598, blue: 750},
    _PRNT_SCR: {key: "{prtscr}", red: 447, green: 603, blue: 755},
    _SCR_LCK: {key: "{scrolllock}", red: 491, green: 647, blue: 799},
    _PAUSE: {key: "{pause}", red: 496, green: 652, blue: 804},
    _LIGHT: {key: "{light}", red: 503, green: 659, blue: 811},
    _PLAY: {key: "{mediaplaypause}", red: 516, green: 668, blue: 820},
    _NEXT: {key: "{mediatracknext}", red: 525, green: 677, blue: 829},
    _TILDA: {key: "`", red: 434, green: 590, blue: 742},
    _1: {key: "1", red: 425, green: 581, blue: 733},
    _2: {key: "2", red: 416, green: 568, blue: 724},
    _3: {key: "3", red: 407, green: 559, blue: 715},
    _4: {key: "4", red: 398, green: 550, blue: 702},
    _5: {key: "5", red: 403, green: 555, blue: 711},
    _6: {key: "6", red: 389, green: 541, blue: 693},
    _7: {key: "7", red: 394, green: 546, blue: 698},
    _8: {key: "8", red: 483, green: 635, blue: 791},
    _9: {key: "9", red: 488, green: 644, blue: 796},
    _0: {key: "0", red: 473, green: 625, blue: 781},
    _MINUS: {key: "-", red: 464, green: 616, blue: 772},
    _PLUS: {key: "=", red: 456, green: 608, blue: 760},
    _BACKSPACE: {key: "{backspace}", red: 452, green: 604, blue: 756},
    _INSERT: {key: "{insert}", red: 453, green: 605, blue: 757},
    _HOME: {key: "{home}", red: 497, green: 653, blue: 805},
    _PAGE_UP: {key: "{pageup}", red: 498, green: 654, blue: 806},
    _NUM_LOCK: {key: "{numlock}", red: 494, green: 650, blue: 802},
    _NUM_SLASH: {key: "{numpaddivide}", red: 502, green: 658, blue: 810},
    _NUM_STAR: {key: "{numpadmultiply}", red: 524, green: 676, blue: 828},
    _NUM_MINUS: {key: "{numpadsubtract}", red: 511, green: 667, blue: 819},
    _TAB: {key: "{tab}", red: 435, green: 591, blue: 743},
    _Q: {key: "q", red: 426, green: 582, blue: 734},
    _W: {key: "w", red: 417, green: 569, blue: 725},
    _E: {key: "e", red: 408, green: 560, blue: 716},
    _R: {key: "r", red: 399, green: 551, blue: 703},
    _T: {key: "t", red: 404, green: 556, blue: 712},
    _Y: {key: "y", red: 390, green: 542, blue: 694},
    _U: {key: "u", red: 484, green: 636, blue: 792},
    _I: {key: "i", red: 474, green: 626, blue: 782},
    _O: {key: "o", red: 479, green: 631, blue: 787},
    _P: {key: "p", red: 465, green: 617, blue: 773},
    _L_BRACKET: {key: "[", red: 457, green: 609, blue: 761},
    _R_BRACKET: {key: "]", red: 461, green: 613, blue: 765},
    _BACKSLASH: {key: "\\", red: 444, green: 600, blue: 752},
    _DELETE: {key: "{delete}", red: 493, green: 649, blue: 801},
    _END: {key: "{end}", red: 495, green: 651, blue: 803},
    _PAGE_DOWN: {key: "{pagedown}", red: 492, green: 648, blue: 800},
    _NUM_7: {key: "{numpad7}", red: 538, green: 690, blue: 846},
    _NUM_8: {key: "{numpad8}", red: 507, green: 663, blue: 815},
    _NUM_9: {key: "{numpad9}", red: 529, green: 681, blue: 837},
    _NUM_PLUS: {key: "{numpadadd}", red: 520, green: 672, blue: 824},
    _CAPS_LOCK: {key: "{capslock}", red: 436, green: 592, blue: 744},
    _A: {key: "a", red: 427, green: 583, blue: 735},
    _S: {key: "s", red: 418, green: 570, blue: 726},
    _D: {key: "d", red: 409, green: 561, blue: 717},
    _F: {key: "f", red: 413, green: 565, blue: 721},
    _G: {key: "g", red: 400, green: 552, blue: 708},
    _H: {key: "h", red: 391, green: 543, blue: 695},
    _J: {key: "j", red: 485, green: 637, blue: 793},
    _K: {key: "k", red: 475, green: 627, blue: 783},
    _L: {key: "l", red: 476, green: 628, blue: 784},
    _COLON: {key: ";", red: 466, green: 618, blue: 774},
    _QUOTE: {key: "'", red: 458, green: 610, blue: 762},
    _RETURN: {key: "{enter}", red: 446, green: 602, blue: 754},
    _NUM_4: {key: "{numpad4}", red: 535, green: 687, blue: 843},
    _NUM_5: {key: "{numpad5}", red: 504, green: 660, blue: 812},
    _NUM_6: {key: "{numpad6}", red: 526, green: 678, blue: 830},
    _L_SHIFT: {key: "{shiftleft}", red: 437, green: 593, blue: 745},
    _Z: {key: "z", red: 419, green: 571, blue: 727},
    _X: {key: "x", red: 421, green: 573, blue: 729},
    _C: {key: "c", red: 412, green: 564, blue: 720},
    _V: {key: "v", red: 410, green: 562, blue: 718},
    _B: {key: "b", red: 401, green: 553, blue: 709},
    _N: {key: "n", red: 392, green: 544, blue: 696},
    _M: {key: "m", red: 486, green: 638, blue: 794},
    _COMMA: {key: ",", red: 477, green: 629, blue: 785},
    _DOT: {key: ".", red: 478, green: 630, blue: 786},
    _QUESTION: {key: "/", red: 468, green: 620, blue: 776},
    _R_SHIFT: {key: "{shiftright}", red: 462, green: 614, blue: 766},
    _UP: {key: "{arrowup}", red: 531, green: 683, blue: 839},
    _NUM_1: {key: "{numpad1}", red: 532, green: 684, blue: 840},
    _NUM_2: {key: "{numpad2}", red: 501, green: 657, blue: 809},
    _NUM_3: {key: "{numpad3}", red: 523, green: 675, blue: 827},
    _NUM_RETURN: {key: "{numpadenter}", red: 517, green: 669, blue: 821},
    _L_CTRL: {key: "{controlleft}", red: 438, green: 594, blue: 746},
    _WINDOWS: {key: "{metaleft}", red: 429, green: 585, blue: 737},
    _L_ALT: {key: "{altleft}", red: 420, green: 572, blue: 728},
    _SPACE: {key: "{space}", red: 411, green: 563, blue: 719},
    _R_ALT: {key: "{altright}", red: 480, green: 632, blue: 788},
    _FN: {key: "{fn}", red: 471, green: 623, blue: 779},
    _OPTIONS: {key: "{contextmenu}", red: 470, green: 622, blue: 778},
    _R_CTRL: {key: "{controlright}", red: 459, green: 611, blue: 763},
    _LEFT: {key: "{arrowleft}", red: 536, green: 688, blue: 844},
    _DOWN: {key: "{arrowdown}", red: 533, green: 685, blue: 841},
    _RIGHT: {key: "{arrowright}", red: 534, green: 686, blue: 842},
    _NUM_0: {key: "{numpad0}", red: 537, green: 689, blue: 845},
    _NUM_DOT: {key: "{numpaddecimal}", red: 528, green: 680, blue: 836},
    _PIPE_LT: {key: "{pipeleft}", red: 424, green: 580, blue: 732},
    _PIPE_LB: {key: "{pipe_lb}", red: 430, green: 586, blue: 738},
    _PIPE_RT: {key: "{piperight}", red: 519, green: 671, blue: 823},
    _PIPE_RB: {key: "{pipe_lb}", red: 439, green: 595, blue: 747}
});
