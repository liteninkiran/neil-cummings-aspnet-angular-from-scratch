import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const toastr = inject(ToastrService);

    return accountService.currentUser$.pipe(
        map(user => {
            if (!user) {
                toastr.error('Not authorised');
            }
            return !!user;
        })
    )
};
