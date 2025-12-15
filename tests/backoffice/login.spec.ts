import {test,expect} from '@playwright/test';
import { LoginPage } from '../../pages/backoffice/LoginPage';

test('@smoke Back Office: login and land on Dashboard', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoStart();
    await login.loginIfNeeded(process.env.BACKOFFICE_USER!, process.env.BACKOFFICE_PASS!);
    await expect(page).toHaveURL('?rf=Task&qrc=list')
})