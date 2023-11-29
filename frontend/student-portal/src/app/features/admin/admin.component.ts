import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  loading$!: Observable<boolean> | null;
  displayedColumns: string[] = [
    'id',
    'email',
    'role',
    'fname',
    'lname',
    'customColumn',
  ];

  currentUser = this.auth.getCurrentUser();
  userId = this.currentUser?.USER_ID;

  users$ = this.userService.users$;

  dataSource = new MatTableDataSource<any>();

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private navigation: NavigationService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private modalService: ModalService
  ) {
    this.userService.getUsers(this.userId!).subscribe();
    this.users$.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.loading$ = this.loadingService.loading$;
  }

  createUser() {
    this.navigation.navigateTo(['create-user'], this.route);
  }

  deleteUser(user: any) {
    this.modalService.openDialog({
      user,
    });
  }

  editUser(user: any) {
    this.navigation.navigateWithData(['edit-user'], user, this.route);
  }

  logout() {
    this.auth.logout();
  }
}
