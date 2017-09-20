import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('todo');
    },

    actions: {
        removeItem(item) {
            this.get('datastore').removeitem(item.name);
            item.destroyRecord();
        },

        editNow(item) {
            console.log(item);
            item.save();
        },

        completeItem(item, toCheck){
            if (toCheck) {
                this.store.findRecord('todo', item.id).then((todo) => {
                    todo.set('isCompleted', true);
                    console.log('update vayo true');
                    todo.save();
                }).catch(() => {
                    console.log('true but error update');
                })
            } else {
                this.store.findRecord('todo', item.id).then((todo) => {
                    todo.set('isCompleted', false);
                    todo.save();
                    console.log('update vayo false');
                }).catch(() => {
                    console.log('false but error update');
                })
            } 
        }
    }
});
