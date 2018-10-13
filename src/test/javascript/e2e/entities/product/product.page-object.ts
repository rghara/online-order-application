import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    keywordsInput = element(by.id('field_keywords'));
    descriptionInput = element(by.id('field_description'));
    ratingInput = element(by.id('field_rating'));
    dateAddedInput = element(by.id('field_dateAdded'));
    dateModifiedInput = element(by.id('field_dateModified'));
    wishlistSelect = element(by.id('field_wishlist'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setKeywordsInput(keywords) {
        await this.keywordsInput.sendKeys(keywords);
    }

    async getKeywordsInput() {
        return this.keywordsInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setRatingInput(rating) {
        await this.ratingInput.sendKeys(rating);
    }

    async getRatingInput() {
        return this.ratingInput.getAttribute('value');
    }

    async setDateAddedInput(dateAdded) {
        await this.dateAddedInput.sendKeys(dateAdded);
    }

    async getDateAddedInput() {
        return this.dateAddedInput.getAttribute('value');
    }

    async setDateModifiedInput(dateModified) {
        await this.dateModifiedInput.sendKeys(dateModified);
    }

    async getDateModifiedInput() {
        return this.dateModifiedInput.getAttribute('value');
    }

    async wishlistSelectLastOption() {
        await this.wishlistSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async wishlistSelectOption(option) {
        await this.wishlistSelect.sendKeys(option);
    }

    getWishlistSelect(): ElementFinder {
        return this.wishlistSelect;
    }

    async getWishlistSelectedOption() {
        return this.wishlistSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
