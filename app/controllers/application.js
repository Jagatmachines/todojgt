import Ember from 'ember';

export default Ember.Controller.extend({
    datastore: Ember.inject.service('datastore'),

    notCompleted: Ember.computed.filterBy('model', 'isCompleted', false),

    checkAll: Ember.computed('model.@each.isCompleted', {
        get() {
            let todos = this.get('model');
            return todos.get('length') && todos.isEvery('isCompleted');
        },
        set(key, value) {
            let todos = this.get('model');
            todos.setEach('isCompleted', value);
            todos.save();
            return value;
        }
    }),
    
    actions: {
        createItem() {
            var citem = this.get('createitem');
            if (citem != '' && citem != undefined) {
                this.get('datastore').additem(citem);
                const createitem = this.store.createRecord('todo', {
                    name: citem
                });
    
                createitem.save().then(() => {
                    console.log('item create');
                    this.set('createitem', '');
                }).catch(() => {
                    console.log('not created');
                })
            }  
        
        },

        clearComplete() {
            this.store.query('todo', {isCompleted: true}).then((completedTodos) => {
                completedTodos.forEach((completedTodo) => {
                    completedTodo.destroyRecord();
                });
            });
        }
    }
});
