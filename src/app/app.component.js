import angular from 'angular';
import AppService from "./app.service";
import template from './app.component.html';
import style from './add.component.scss';

class AppController {

    constructor(appService) {
        this.appService = appService;
        appService.getNews().then(news => {
            this.news = news;
            this.sortNews('id', 1);
        });
    }

    get completedCount() {
        return this.news.filter(item => item.status === 'Completed').length;
    }

    get notCompletedCount() {
        return this.news.filter(item => item.status === 'Not completed').length;
    }

    hasSelection() {
        return this.news && this.news.some(item => item.selected);
    }

    clearSelection() {
        this.news.forEach(item => item.selected = false);
    }

    get allSelected() {
        return this.news && this.news.every(item => item.selected);
    }

    set allSelected(value) {
        this.news.forEach(item => item.selected = value);
    }

    showDialog() {
        this.item = {
            title: '',
            content: '',
            status: 'New'
        }
    }

    saveNews() {
        this.news.push(this.appService.addNewsItem(this.item));
        this.item = null;
        this.sortNews(this.sortColumn, this.sortOrder);
    }

    deleteSelectedNews() {
        this.news = this.news.filter(item => !item.selected);
    }

    onSortClick(column) {
        this.sortNews(column, this.sortColumn !== column ? 1 : -this.sortOrder);
    }

    sortNews(column, order) {
        this.sortColumn = column;
        this.sortOrder = order;

        this.news.sort((a, b) => a.id - b.id);
        if (column !== 'id') {
            this.news.sort((a, b) => compare(a[column], b[column]));
        }
        if (order < 0) {
            this.news.reverse();
        }
    }

    getSortClass(column) {
        if (column !== this.sortColumn) {
            return '';
        }
        return this.sortOrder > 0 ? 'sort-up' : 'sort-down';
    }
}

function compare(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

AppController.$inject = ['AppService'];

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .component('app', {
        template: template,
        controller: AppController
    })
    .service('AppService', AppService);

export default MODULE_NAME;
