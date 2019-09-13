export default class AppService {
    constructor($http) {
        this.$http = $http;
    }

    getNews() {
        return this.$http.get('api/news.json').then(result => this.news = result.data);
    }

    addNewsItem(item) {
        let maxId = 0;

        this.news.forEach(item => maxId = Math.max(item.id, maxId));
        item.id = maxId + 1;
        return item;
    }
}

AppService.inject = ['$http'];