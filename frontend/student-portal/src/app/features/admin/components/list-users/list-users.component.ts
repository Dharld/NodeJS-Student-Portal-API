import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent {
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
    private modalService: ModalService,
    private router: Router
  ) {
    this.userService.getUsers(this.userId!).subscribe();
    this.users$.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.loading$ = this.loadingService.loading$;
  }

  createUser() {
    this.router.navigate(['admin', { outlets: { other: ['create'] } }]);
  }

  deleteUser(user: any) {
    this.modalService.openDialog({
      user,
    });
  }

  editUser(user: any) {
    this.router.navigate(['admin', { outlets: { other: 'edit' } }], {
      state: user,
    });
  }
}
