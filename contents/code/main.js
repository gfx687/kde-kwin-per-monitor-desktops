var MONITOR_1_NAME = "MONITOR_1_NAME";
var MONITOR_2_NAME = "MONITOR_2_NAME";

function outputByName(name) {
  for (var index = 0; index < workspace.screens.length; ++index) {
    if (workspace.screens[index].name === name) {
      return workspace.screens[index];
    }
  }
  return null;
}

function windowIsOnDesktop(window, desktop) {
  if (window.onAllDesktops) {
    return true;
  }
  for (var index = 0; index < window.desktops.length; ++index) {
    if (window.desktops[index].id === desktop.id) {
      return true;
    }
  }
  return false;
}

function focusTopWindowOn(output, desktop) {
  for (var index = workspace.stackingOrder.length - 1; index >= 0; --index) {
    var window = workspace.stackingOrder[index];
    if (
      window.output === output &&
      !window.specialWindow &&
      window.wantsInput &&
      !window.minimized &&
      windowIsOnDesktop(window, desktop)
    ) {
      workspace.activeWindow = window;
      return;
    }
  }
}

function screenIndex(output) {
  for (var index = 0; index < workspace.screens.length; ++index) {
    if (workspace.screens[index] === output) {
      return index;
    }
  }
  return -1;
}

function invokeKWinShortcut(name, callback) {
  callDBus(
    "org.kde.kglobalaccel",
    "/component/kwin",
    "org.kde.kglobalaccel.Component",
    "invokeShortcut",
    name,
    callback,
  );
}

function focusOutputAndMovePointer(output) {
  var index = screenIndex(output);
  if (index < 0 || index > 7) {
    print("Per-monitor desktops: cannot focus output index " + index);
    return;
  }

  invokeKWinShortcut("Switch to Screen " + index, function () {
    invokeKWinShortcut("MoveMouseToCenter");
  });
}

function selectDesktop(preferredOutputName, fallbackOutputName, desktopNumber) {
  var output =
    outputByName(preferredOutputName) || outputByName(fallbackOutputName);
  var desktop = workspace.desktops[desktopNumber - 1];

  if (!output) {
    print(
      "Per-monitor desktops: neither output is available: " +
        preferredOutputName +
        ", " +
        fallbackOutputName,
    );
    return;
  }
  if (!desktop) {
    print("Per-monitor desktops: desktop " + desktopNumber + " does not exist");
    return;
  }

  workspace.setCurrentDesktopForScreen(desktop, output);
  focusTopWindowOn(output, desktop);
  focusOutputAndMovePointer(output);
}

function bind(
  name,
  description,
  sequence,
  preferredOutputName,
  fallbackOutputName,
  desktopNumber,
) {
  registerShortcut(name, description, sequence, function () {
    selectDesktop(preferredOutputName, fallbackOutputName, desktopNumber);
  });
}

bind(
  "per-monitor-desktop-1",
  "Monitor 1: switch to desktop 1",
  "Meta+1",
  MONITOR_1_NAME,
  MONITOR_2_NAME,
  1,
);
bind(
  "per-monitor-desktop-2",
  "Monitor 1: switch to desktop 2",
  "Meta+2",
  MONITOR_1_NAME,
  MONITOR_2_NAME,
  2,
);
bind(
  "per-monitor-desktop-3",
  "Monitor 1: switch to desktop 3",
  "Meta+3",
  MONITOR_1_NAME,
  MONITOR_2_NAME,
  3,
);
bind(
  "per-monitor-desktop-4",
  "Monitor 2: switch to desktop 1",
  "Meta+4",
  MONITOR_2_NAME,
  MONITOR_1_NAME,
  1,
);
bind(
  "per-monitor-desktop-5",
  "Monitor 2: switch to desktop 2",
  "Meta+5",
  MONITOR_2_NAME,
  MONITOR_1_NAME,
  2,
);
bind(
  "per-monitor-desktop-6",
  "Monitor 2: switch to desktop 3",
  "Meta+6",
  MONITOR_2_NAME,
  MONITOR_1_NAME,
  3,
);
