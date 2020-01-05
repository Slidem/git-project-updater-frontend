/**
 * Listener for events that happen on components also defined in the navbar
 */
class NavbarComponentListener {
  constructor(onComponentMountedEvent) {
    this.onComponentMountedEvent = onComponentMountedEvent;
  }

  navbarItemMounted(navBarItemCode) {
    if (!this.onComponentMountedEvent) {
      console.log("No component mounted event defined !");
      return;
    }

    this.onComponentMountedEvent(navBarItemCode);
  }
}

export default NavbarComponentListener;
