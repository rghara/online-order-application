import { element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-address div table .btn-danger'));
    title = element.all(by.css('jhi-address div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class AddressUpdatePage {
    pageTitle = element(by.id('jhi-address-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    address1Input = element(by.id('field_address1'));
    address2Input = element(by.id('field_address2'));
    cityInput = element(by.id('field_city'));
    postcodeInput = element(by.id('field_postcode'));
    countryInput = element(by.id('field_country'));
    customerSelect = element(by.id('field_customer'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setAddress1Input(address1) {
        await this.address1Input.sendKeys(address1);
    }

    async getAddress1Input() {
        return this.address1Input.getAttribute('value');
    }

    async setAddress2Input(address2) {
        await this.address2Input.sendKeys(address2);
    }

    async getAddress2Input() {
        return this.address2Input.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setPostcodeInput(postcode) {
        await this.postcodeInput.sendKeys(postcode);
    }

    async getPostcodeInput() {
        return this.postcodeInput.getAttribute('value');
    }

    async setCountryInput(country) {
        await this.countryInput.sendKeys(country);
    }

    async getCountryInput() {
        return this.countryInput.getAttribute('value');
    }

    async customerSelectLastOption() {
        await this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async customerSelectOption(option) {
        await this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    async getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class AddressDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-address-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-address'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
