import { Page, Locator } from '@playwright/test';

export class Sidebar {
  private nav: Locator;

  constructor(private page: Page) {
    this.nav = page.locator('#sidebar-nav').first();
  }

  
  private item(name: string): Locator {
    // Find any clickable element that contains the text
    return this.nav.locator('a, button, li, div').filter({
      hasText: new RegExp(`^\\s*${escapeRegExp(name)}\\s*$`, 'i'),
    }).first();
  }
  

  async goTo(moduleName: string, submoduleName: string) {
    const moduleItem = this.item(moduleName);
    const subItem = this.item(submoduleName);

    // If submodule is already visible, module is already expanded
    if (!(await subItem.isVisible().catch(() => false))) {
      await moduleItem.click();
    }

    // Now click the submodule
    await subItem.click();
    
  }

  async goToAssignNewTask() {
    await this.goTo('Task Management', 'Assign New Task');
  }
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
