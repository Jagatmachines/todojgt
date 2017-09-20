import Ember from 'ember';

export default Ember.Service.extend({
    items: [],

    log() {
        console.log(this.get('items').map(x => x.id).join(', '));
    },

    additem(item) {
        this.get('items').addObject(item);
        console.log(this.get('items'));
        //this.log();
    },

    allitem() {
        
        console.log(this.get('items'));
        return this.get('items');
    },

    removeitem(item) {
        this.get('items').removeObject(item);
    },

    edititem(item) {
        this.get('items').findBy(item);
    }

    
});
