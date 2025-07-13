import { Component } from '@angular/core';
import { BoardHeaderComponent } from "../../features/board/components/board-header/board-header.component";


@Component({
  selector: 'app-board-view',
  imports: [BoardHeaderComponent],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent {

}
