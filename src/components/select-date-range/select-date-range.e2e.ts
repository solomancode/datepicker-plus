import { newE2EPage } from '@stencil/core/testing';

describe('select-date-range', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<select-date-range></select-date-range>');
    const element = await page.find('select-date-range');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<select-date-range></select-date-range>');
    const component = await page.find('select-date-range');
    const element = await page.find('select-date-range >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
