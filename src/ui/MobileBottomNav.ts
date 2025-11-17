import { ToolMode } from '../types/VoxelTypes';

/**
 * Tool configuration for mobile navigation
 */
interface ToolConfig {
  id: string;
  icon: string;
  label: string;
  ariaLabel: string;
}

/**
 * MobileBottomNav - Bottom navigation bar for mobile devices
 * Provides quick access to main tools: Place, Break, Paint, Fill, Menu
 */
export class MobileBottomNav {
  private container: HTMLElement;
  private navElement: HTMLElement;
  private activeTool: string = 'place';
  private toolChangeCallbacks: ((tool: string) => void)[] = [];
  private menuOpenCallbacks: (() => void)[] = [];

  private tools: ToolConfig[] = [
    { id: 'place', icon: '🏗️', label: 'Place', ariaLabel: 'Place Block' },
    { id: 'break', icon: '⛏️', label: 'Break', ariaLabel: 'Break Block' },
    { id: 'paint', icon: '🎨', label: 'Paint', ariaLabel: 'Paint Block' },
    { id: 'fill', icon: '🪣', label: 'Fill', ariaLabel: 'Fill Area' },
    { id: 'menu', icon: '☰', label: 'Menu', ariaLabel: 'Open Menu' },
  ];

  constructor(container: HTMLElement) {
    this.container = container;
    this.navElement = this.createNavigationBar();
    this.container.appendChild(this.navElement);
    this.attachEventListeners();
  }

  /**
   * Create the navigation bar HTML structure
   */
  private createNavigationBar(): HTMLElement {
    const nav = document.createElement('div');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Mobile tool navigation');

    this.tools.forEach(tool => {
      const button = this.createToolButton(tool);
      nav.appendChild(button);
    });

    return nav;
  }

  /**
   * Create a single tool button
   */
  private createToolButton(tool: ToolConfig): HTMLElement {
    const button = document.createElement('button');
    button.className = 'mobile-nav-btn';
    button.setAttribute('data-tool', tool.id);
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', tool.ariaLabel);
    button.setAttribute('aria-pressed', tool.id === this.activeTool ? 'true' : 'false');

    if (tool.id === this.activeTool) {
      button.classList.add('active');
    }

    const icon = document.createElement('span');
    icon.className = 'mobile-nav-icon';
    icon.textContent = tool.icon;

    const label = document.createElement('span');
    label.className = 'mobile-nav-label';
    label.textContent = tool.label;

    button.appendChild(icon);
    button.appendChild(label);

    return button;
  }

  /**
   * Attach event listeners to buttons
   */
  private attachEventListeners(): void {
    const buttons = this.navElement.querySelectorAll('.mobile-nav-btn');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const tool = target.getAttribute('data-tool');

        if (!tool) return;

        // Menu button triggers menu open, not tool change
        if (tool === 'menu') {
          this.triggerMenuOpen();
        } else {
          this.setActiveTool(tool as ToolMode);
          this.triggerToolChange(tool);
        }
      });

      // Support for touch events
      button.addEventListener('touchend', (e) => {
        // Prevent default to avoid double-firing with click
        e.preventDefault();

        const target = e.currentTarget as HTMLElement;
        const tool = target.getAttribute('data-tool');

        if (!tool) return;

        // Menu button triggers menu open, not tool change
        if (tool === 'menu') {
          this.triggerMenuOpen();
        } else {
          this.setActiveTool(tool as ToolMode);
          this.triggerToolChange(tool);
        }
      });
    });
  }

  /**
   * Set the active tool
   */
  public setActiveTool(tool: string): void {
    // Validate tool exists
    const toolExists = this.tools.some(t => t.id === tool);
    if (!toolExists || tool === 'menu') {
      return;
    }

    // Remove active class from all buttons
    const buttons = this.navElement.querySelectorAll('.mobile-nav-btn');
    buttons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    // Add active class to selected tool
    const activeButton = this.navElement.querySelector(`[data-tool="${tool}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
      this.activeTool = tool;
    }
  }

  /**
   * Get the current active tool
   */
  public getActiveTool(): string {
    return this.activeTool;
  }

  /**
   * Register callback for tool change events
   */
  public onToolChange(callback: (tool: string) => void): void {
    this.toolChangeCallbacks.push(callback);
  }

  /**
   * Register callback for menu open events
   */
  public onMenuOpen(callback: () => void): void {
    this.menuOpenCallbacks.push(callback);
  }

  /**
   * Trigger tool change callbacks
   */
  private triggerToolChange(tool: string): void {
    this.toolChangeCallbacks.forEach(callback => callback(tool));
  }

  /**
   * Trigger menu open callbacks
   */
  private triggerMenuOpen(): void {
    this.menuOpenCallbacks.forEach(callback => callback());
  }

  /**
   * Clean up and remove the navigation bar
   */
  public destroy(): void {
    if (this.navElement && this.navElement.parentNode) {
      this.navElement.parentNode.removeChild(this.navElement);
    }
  }
}
