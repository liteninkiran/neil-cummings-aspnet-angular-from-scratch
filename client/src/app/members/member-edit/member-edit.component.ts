import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {

    public member: Member | undefined;
    public user: User | undefined;

    constructor(
        private memberService: MembersService,
        private accountService: AccountService,
    ) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user ? user : undefined);
    }

    public ngOnInit(): void {
        this.loadMember();
    }

    public loadMember(): void {
        if (!this.user) {
            return;
        }
        this.memberService
            .getMember(this.user.username)
            .subscribe((member) => this.member = member);
    }
}
