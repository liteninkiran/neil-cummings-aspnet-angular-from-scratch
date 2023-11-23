import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {

    @Input() public member: Member | undefined;

    public uploader: FileUploader | undefined;
    public hasBaseDropZoneOver: boolean = false;
    public baseUrl = environment.apiUrl;
    public user: User | undefined;
    public response: string = '';

    constructor(
        private accountService: AccountService,
    ) {
        this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
            if (user) {
                this.user = user;
            }
        });
    }

    public ngOnInit(): void {
        this.initialiseUploader();
    }

    public setMainPhoto(photo: Photo) {

    }

    public deletePhoto(photoId: number) {

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    private initialiseUploader() {

        this.uploader = new FileUploader({
            url: this.baseUrl,
            authToken: 'Bearer ' + this.user?.token,
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024,
        });
        this.uploader.onAfterAddingAll = (file) => file.withCredentials = false;
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const photo = JSON.parse(response);
                this.member?.photos.push(photo);
            }
        }
    }

}
