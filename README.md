# Per-monitor desktop shortcuts for Plasma Wayland

KDE Plasma added per-monitor virtual desktops in 6.7+ but there is no built-in shortcut / setting to assign specific virtual desktops to specific monitors.

This script allows to bind, for example, **Meta+123** to three virtual desktops on **Monitor-1** and **Meta-456** to three virtual desktops on **Monitor-2**.

Tested with two monitors, including disconnecting and reconnecting one.

## Installation

1. In **System Settings → Window Management → Virtual Desktops**, create at
   three virtual desktops, then enable **Switch desktops independently for
   each screen**.
2. Run `kscreen-doctor -o` in a terminal. Find the connector names for the two
   displays, such as `DP-1` and `HDMI-A-1`.
3. Edit `contents/code/main.js`. Replace the two `REPLACE_WITH_...` strings:
   `MONITOR_1_NAME` is the monitor for Meta+1 through Meta+3; `MONITOR_2_NAME`
   is the monitor for Meta+4 through Meta+6.
4. Install the edited package from this directory:

   ```sh
   kpackagetool6 --type KWin/Script --install .
   ```

   If you installed an earlier copy of this package, use `--upgrade .` instead
   of `--install .`.

5. In **KWin Scripts**, enable **Per-monitor desktop shortcuts**. Log out and
   back in if it does not load immediately.
6. In **System Settings → Keyboard → Shortcuts**, search for
   `per-monitor-desktop`. Assign the six shown shortcuts if needed. Before
   assigning them, remove any conflicting `Meta+1` through `Meta+6` bindings,
   especially **Activate Task Manager Entry 1** through **6**.
