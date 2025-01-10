import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-lead-item',
  templateUrl: './lead-item.component.html',
  styleUrls: ['./lead-item.component.scss'],
})
export class LeadItemComponent implements OnInit {

  @Input() lead;

  constructor() { }

  ngOnInit() {}

}
