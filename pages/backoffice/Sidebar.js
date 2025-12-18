class Sidebar {
  constructor(page) {
    this.page = page;
    this.nav = page.locator('#sidebar-nav').first();
  }

  item(name) {
    return this.nav
      .locator('a, button, li, div')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(name)}\\s*$`, 'i') })
      .first();
  }

  async goTo(moduleName, submoduleName) {
    const moduleItem = this.item(moduleName);
    const subItem = this.item(submoduleName);

    // Ensure sidebar exists
    await this.nav.waitFor({ state: 'visible' });

    // If submodule isn't visible, expand module
    const subVisible = await subItem.isVisible().catch(() => false);
    if (!subVisible) {
      await moduleItem.waitFor({ state: 'visible' });
      await moduleItem.click();
    }

    // Click the submodule
    await subItem.waitFor({ state: 'visible' });
    await subItem.click();
  }

  async goToAssignNewTask() {
    await this.goTo('Task Management', 'Assign New Task');
  }
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = Sidebar;
