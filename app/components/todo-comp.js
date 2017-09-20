import Ember from 'ember';

export default Ember.Component.extend({
    toggleEditItem : false,
    editItem: null,

    actions: {
        editFast() {
            this.set('toggleEditItem', true);
            //this.sendAction('onItemClicked', this.get('item'));
            //debugger;
        },

        removeFast() {
            this.sendAction('onDeleteItem', this.get('item'));
        },

        editComplete() {
            this.sendAction('onItemClicked', this.get('item'));
            this.set('toggleEditItem', false);
        },

        tComplete(toCheck) {
            if (toCheck) {
                this.sendAction('onCompleteItem', this.get('item'), false);
                //this.sendAction('onCompleteItem', this.get('item'));
            } else {
                this.set('toCheck', true);
                //this.sendAction('onCompleteItem', this.get('item'));
                this.sendAction('onCompleteItem', this.get('item'), true);
            }
        }

    }
});
