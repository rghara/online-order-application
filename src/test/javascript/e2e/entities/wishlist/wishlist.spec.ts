/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WishlistComponentsPage, WishlistDeleteDialog, WishlistUpdatePage } from './wishlist.page-object';

const expect = chai.expect;

describe('Wishlist e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let wishlistUpdatePage: WishlistUpdatePage;
    let wishlistComponentsPage: WishlistComponentsPage;
    let wishlistDeleteDialog: WishlistDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Wishlists', async () => {
        await navBarPage.goToEntity('wishlist');
        wishlistComponentsPage = new WishlistComponentsPage();
        expect(await wishlistComponentsPage.getTitle()).to.eq('Wishlists');
    });

    it('should load create Wishlist page', async () => {
        await wishlistComponentsPage.clickOnCreateButton();
        wishlistUpdatePage = new WishlistUpdatePage();
        expect(await wishlistUpdatePage.getPageTitle()).to.eq('Create or edit a Wishlist');
        await wishlistUpdatePage.cancel();
    });

    it('should create and save Wishlists', async () => {
        const nbButtonsBeforeCreate = await wishlistComponentsPage.countDeleteButtons();

        await wishlistComponentsPage.clickOnCreateButton();
        await promise.all([wishlistUpdatePage.setTitleInput('title'), wishlistUpdatePage.customerSelectLastOption()]);
        expect(await wishlistUpdatePage.getTitleInput()).to.eq('title');
        const selectedRestricted = wishlistUpdatePage.getRestrictedInput();
        if (await selectedRestricted.isSelected()) {
            await wishlistUpdatePage.getRestrictedInput().click();
            expect(await wishlistUpdatePage.getRestrictedInput().isSelected()).to.be.false;
        } else {
            await wishlistUpdatePage.getRestrictedInput().click();
            expect(await wishlistUpdatePage.getRestrictedInput().isSelected()).to.be.true;
        }
        await wishlistUpdatePage.save();
        expect(await wishlistUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await wishlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Wishlist', async () => {
        const nbButtonsBeforeDelete = await wishlistComponentsPage.countDeleteButtons();
        await wishlistComponentsPage.clickOnLastDeleteButton();

        wishlistDeleteDialog = new WishlistDeleteDialog();
        expect(await wishlistDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Wishlist?');
        await wishlistDeleteDialog.clickOnConfirmButton();

        expect(await wishlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
