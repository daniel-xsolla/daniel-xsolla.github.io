﻿var isIE = (navigator.userAgent.indexOf('MSIE') != -1); var isIE11 = (navigator.userAgent.indexOf('Trident') != -1); var isFF = (navigator.userAgent.indexOf('Firefox') != -1); var isChrome = (navigator.userAgent.indexOf('Chrome') != -1); var isSafari = (navigator.userAgent.indexOf('Safari') != -1); var isOpera = (navigator.userAgent.indexOf('OPR') != -1); var isEdge = (navigator.userAgent.indexOf('Edge') != -1); var ClassID = "CLSID:8F184CF0-0C87-4D4C-A343-355DE74E6BCC"; var FFID = "application/softnyxlauncher,version=1.0"; var LauncherVersion = "20121015_SoftnyxWeb"; var LoadIE = "0"; var LoadFF = "0"; var Load_PluginSucess = "1"; var Error_LoadPlugin = "2"; var Error_LoadIE = "3"; var Error_LoadFF = "3"; var LauncherUser = "4"; var LauncherNotuse = "5"; var Sucess = "9"; var isSupported = false; if (!isChrome) { LoadPlugin() } function LoadPlugin() { if (isOpera) { return Error_LoadPlugin } else if (isChrome) { return Error_LoadPlugin } else if (isIE || isIE11) { return LoadPluginIE() } else if (isFF) { navigator.plugins.refresh(false); return LoadPluginFF() } else if (isSafari) { navigator.plugins.refresh(false); return LoadPluginFF() } else { return Error_LoadPlugin } }; function RegeditCheck() { if (isOpera) { return Error_LoadPlugin } else if (isChrome) { return Error_LoadPlugin } else if (isIE || isIE11) { return Regedit_CheckIE() } else if (isFF || isSafari) { navigator.plugins.refresh(false); return Regedit_CheckFF() } else { return Error_LoadPlugin } }; function Regedit_CheckIE() { try { var obj = document.myX.Check_Regedit(); if (obj != 1) { return Error_LoadIE } else { return Load_PluginSucess } } catch (e) { return Error_LoadIE } return Error_LoadIE }; function Regedit_CheckFF() { for (var i = 0; i < navigator.mimeTypes.length; i++) { if (FFID == navigator.mimeTypes[i].type) { if (navigator.mimeTypes[i].enabledPlugin != null) { return Load_PluginSucess } else { } } else { } } return Error_LoadIE }; function LoadPluginIE() { var IEObject = '<OBJECT id="myX" CLASSID="' + ClassID + '" width="0" height="0"></OBJECT>'; var hiddenLauncher = document.getElementById('hidIELauncher'); if (hiddenLauncher) { document.getElementById('hidIELauncher').innerHTML = ''; hiddenLauncher.innerHTML = IEObject } else { return Error_LoadIE } return LoadIE }; function LoadPluginFF() { var launcherHTML = '<EMBED ID="myX" WIDTH="0" HEIGHT="0" TYPE="' + FFID + '"  style="visibility: hidden"> </EMBED>'; var hiddenLauncher = document.getElementById('hidIELauncher'); if (hiddenLauncher) { hiddenLauncher.innerHTML = ''; hiddenLauncher.innerHTML = launcherHTML } else { return Error_LoadFF } return LoadFF }; function Start_GameLauncher(id, pass, game, to, serviceType) { try { var result = ""; var ctl = document.getElementById("myX"); if (isIE || isIE11) { ctl = document.myX } if (ctl != null && ctl != "") { result = ctl.Load_Event(serviceType, id, pass, game, to) } else { return LauncherNotuse } if (result == "1" || result == 1) return LauncherUser; else return LauncherNotuse } catch (e) { alert(e); return LauncherNotuse } }; function Check_Version() { var version = ""; try { var ctl = document.getElementById("myX"); var result = ""; if (isIE || isIE11) { ctl = document.myX } if (ctl != null && ctl != "") { if (LauncherVersion == ctl.CheckVersion()) return "T" } } catch (e) { return "F" } return "F" }; function isWinDesktop() { var filter = "win16|win32|win64"; if (navigator.platform) { if (filter.indexOf(navigator.platform.toLowerCase()) < 0) { return false } else { return true } } }; function bar(arg) { }; function getProtocolLauncherUrl(intid, weblauncherkey, game, serviceType) { return 'softnyxweblauncher' + serviceType + '://launcher_Start?INTID=' + intid + '?KEY=' + weblauncherkey + '?GAME=' + game } function Start_ProtocolLauncher(intid, weblauncherkey, game, serviceType, returl, to) { document.write('<input type="text" id="hidweblaunchstart" style="width:0px; height:0px"></input>'); var url = getProtocolLauncherUrl(intid, weblauncherkey, game, serviceType); var protcolEl = $('#hidweblaunchstart')[0]; isSupported = false; protcolEl.focus(); protcolEl.onblur = function () { isSupported = true }; location.href = url; settiem = 500; setTimeout(function () { protcolEl.onblur = null; protocolLauncherResult(returl, to); $("#hidweblaunchstart").remove() }, settiem) }; function protocolLauncherResult(returl, to) { if (to.length > 0) alert(getMsg(COM_logoutfacebook)); if (isSupported == false) { alert(getMsg(COM_closeprograms)); top.location.href = getLauncherUrl() } else { } } function getLauncherUrl() { var ret = ''; var domain = location.host; if (domain.indexOf('softnyx.net') >= 0) { ret = 'http://www.softnyx.net/launcher/LauncherGuide.aspx' } else if (domain.indexOf('softnyx.com') >= 0) { ret = 'http://www.softnyx.com/launcher/LauncherGuide.aspx' } else if (domain.indexOf('softnyxbrasil.com') >= 0) { ret = 'http://www.softnyxbrasil.com/launcher/LauncherGuide.aspx' } else if (domain.indexOf('softnyx-korea.net') >= 0) { ret = 'http://www.softnyx-korea.net/launcher/LauncherGuide.aspx' } else if (domain.indexOf('imbc.com') >= 0) { ret = 'http://member.wolfteam.imbc.com/etc/LauncherGuide.aspx' } else if (domain.indexOf('softnyx.co.kr') >= 0) { ret = 'http://www.softnyx.co.kr/launcher/LauncherGuide.aspx' } else if (domain.indexOf('softnyx-mena.com') >= 0) { ret = 'http://www.softnyx-mena.com/launcher/LauncherGuide.aspx' } else if (domain.indexOf('softnyx-is.com') >= 0) { ret = 'http://www.softnyx-is.com/launcher/LauncherGuide.aspx' } else { ret = 'http://www.softnyx.net/launcher/LauncherGuide.aspx' } if (isChrome && !isOpera && !isEdge) { ret = ret + "?type=CR" } return ret } function getPotalDomain() { var ret = ''; var domain = location.host; if (domain.indexOf('softnyx.net') >= 0) { ret = 'http://www.softnyx.net' } else if (domain.indexOf('softnyx.com') >= 0) { ret = 'http://www.softnyx.com' } else if (domain.indexOf('softnyxbrasil.com') >= 0) { ret = 'http://www.softnyxbrasil.com' } else if (domain.indexOf('softnyx-korea.net') >= 0) { ret = 'http://www.softnyx-korea.net' } else if (domain.indexOf('imbc.com') >= 0) { ret = 'http://wolfteam.imbc.com' } else if (domain.indexOf('softnyx.co.kr') >= 0) { ret = 'http://www.softnyx.co.kr' } else if (domain.indexOf('softnyx-mena.com') >= 0) { ret = 'http://www.softnyx-mena.com' } else if (domain.indexOf('softnyx-is.com') >= 0) { ret = 'http://www.softnyx-is.com' } else { ret = 'http://112.175.228.40:8881' } return ret } function goWebLauncherStart() { if (isChrome || isEdge || isOpera) { return true } else { var install = RegeditCheck(); if (install == "1") { var version = Check_Version(); if (version == "T") { return true } else { return false } } else { return false } } } function getWebLauncherUrl(gameName) { var gamecode = ''; if (gameName == 'Wolfteam') gamecode = 'WT'; else if (gameName == 'Rakion') gamecode = 'RK'; else if (gameName == 'Gunbound') gamecode = 'GB'; else if (gameName == 'Lovebeat') gamecode = 'LB'; else if (gameName == 'Operation7') gamecode = 'OP'; return getPotalDomain() + '/SoftnyxGameStart.aspx?g=' + gameName + '&ReturnGame=' + encodeURIComponent('http://' + window.location.host + '?weblauncher=true&g=' + gamecode) }