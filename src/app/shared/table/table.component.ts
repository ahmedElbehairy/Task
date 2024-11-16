import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Paginater, User } from 'src/app/core/model/Users';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent {
  @Input() ELEMENT_DATA: User[] = [];
  @Input() pagination!: Paginater;
  @Input()  displayedColumn: string[] = [];
  @Output()  Delete = new EventEmitter<string>;
  @Output() ManyDelete = new EventEmitter<string[]>();
  deleteId!:string ;
  idItem: string[] = [];
  dataSource:any
  selection:any
  displayedColumns: string[] = [];

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    if(!changes['ELEMENT_DATA'].firstChange 
      && changes['ELEMENT_DATA'].currentValue  ){
        console.log(this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA.slice(0 , 10));
        this.selection = new SelectionModel<User>(true, []);
        this.displayedColumns = ['select', ...this.displayedColumn , 'Action']
      }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // delete User
  deleteEl(id:string){
    this.deleteId = id
  }
  // delete more then User
  deleteManyEl() {
    this.ManyDelete.emit(this.idItem);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
 
  cahngePage(e: PageEvent) {
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA.slice(e.pageIndex*10 , e.pageIndex*10+10));
  }
}
