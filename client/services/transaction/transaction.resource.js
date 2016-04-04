'use strict';

angular.module('acholic')
  .factory('Transaction', function ($resource) {
    return $resource('/api/transactions/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      query:{
        method: 'GET',
        url:'/api/transactions/receipt'
      },
      saveCart: {
      	method: 'POST',
      	url: '/api/transactions/cart',
        isArray: true
      }
    });
  });
