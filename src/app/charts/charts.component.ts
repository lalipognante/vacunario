import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  survey = {
    country: '',
    gender: '',
    rating: 0
  }
  chartdata: boolean = false;
  countryCount = [];
  countryData = [];

  //Chart
  view: any[] = [500, 300];
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(public chartsService: ChartsService) { }

  libretas;

  ngOnInit() {
    this.chartsService.bringAllLibretas().subscribe(res => {
      this.libretas = res;
      console.log('estas son todas las libretas', this.libretas);
      })
    
      this.chartsService.bringAllLibretas().subscribe((results) => {
        this.chartdata = true;
        this.processData(results);
      })

  }

  onSelect(event) {
    console.log(event);
  }

  processData(entries) {
    this.countryCount = [];
    this.countryData = [];

    entries.forEach(element => {
      if (this.countryCount[element.country])
        this.countryCount[element.country] += 1;
      else
        this.countryCount[element.country] = 1;
    });
    for (var key in this.countryCount) {
      let singleentry = {
        name: key,
        value: this.countryCount[key]
      }
      this.countryData.push(singleentry);
    }
  }

}




/*
export class AppComponent implements OnInit {
  
  survey = {
    country: '',
    gender: '',
    rating: 0
  }

  chartdata: boolean = false;

  countryCount = [];
  countryData = [];

  //Chart
  view: any[] = [500, 300];
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor(private vote: VoteService) {}



  ngOnInit() {
    this.vote.getAllEntries().subscribe((results) => {
      this.chartdata = true;
      this.processData(results);
    })
  }

  onSelect(event) {
    console.log(event);
  }

  processData(entries) {
    this.countryCount = [];
    this.countryData = [];

    entries.forEach(element => {
      if (this.countryCount[element.country])
        this.countryCount[element.country] += 1;
      else
        this.countryCount[element.country] = 1;
    });
    for (var key in this.countryCount) {
      let singleentry = {
        name: key,
        value: this.countryCount[key]
      }
      this.countryData.push(singleentry);
    }
  }

}
*/