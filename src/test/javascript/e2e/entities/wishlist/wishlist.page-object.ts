import { element, by, ElementFinder } from 'protractor';

export class WishlistComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-wishlist div table .btn-danger'));
    title = element.all(by.css('jhi-wishlist div h2#page-heading span')).first();

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

export class WishlistUpdatePage {
    pageTitle = element(by.id('jhi-wishlist-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    restrictedInput = element(by.id('field_restricted'));
    customerSelect = element(by.id('field_customer'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    getRestrictedInput() {
        return this.restrictedInput;
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

export class WishlistDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-wishlist-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-wishlist'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
