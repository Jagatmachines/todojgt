import { test } from 'qunit';
import moduleForAcceptance from 'todojgt/tests/helpers/module-for-acceptance';
import Ember from 'ember';

moduleForAcceptance('Acceptance | todotest');

test('visiting /', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
  });
});

test('visiting index', function(assert) {
  visit('/');
  click('#filters li:first a');

  andThen(() => {
    assert.equal(currentURL(), '/');
  });
});

test('visiting from root to actives', function(assert){
  visit('/');
  click('#filters li:nth-child(2) a');

  andThen(() => {
    assert.equal(currentURL(), '/actives');
  });
});

test('visiting /actives', function(assert) {
  visit('/actives');

  andThen(() => {
    assert.equal(currentURL(), '/actives');
  });
});

test('visiting /completes', function(assert) {
  visit('/completes');

  andThen(() => {
    assert.equal(currentURL(), '/completes');
  });
});

test('visiting from root to completes', function(assert){
  visit('/');
  click('#filters li:last a');

  andThen(() => {
    assert.equal(currentURL(), '/completes');
  });
});

test('Task Create' ,function(assert) {
  visit('/');
  fillIn('input#new-todo', 'Lol working');
  keyEvent('input#new-todo', 'keydown', 13);
  andThen(() => {
    assert.equal(find('#todo-list li:last label').text(), 'Lol working', 'Creation of Todo Task');
    assert.equal(find('input#new-todo').text(), '', 'Saved and clear input field');
  });
});

test('Task Create Validation' ,function(assert) {
  visit('/');
  fillIn('input#new-todo', '');
  keyEvent('input#new-todo', 'keydown', 13);
  andThen(() => {
    assert.notEqual(find('#todo-list li:last label').text(), '', 'Blanks cannot be inserted');
    assert.equal(find('input#new-todo').text(), '', 'Saved and clear input field');
  });

  andThen(() => {
    fillIn('input#new-todo', undefined);
    keyEvent('input#new-todo', 'keydown', 13);
    andThen(() => {
      assert.notEqual(find('#todo-list li:last label').text(), undefined, 'Undefined cannot be inserted');
      assert.equal(find('input#new-todo').text(), '', 'Saved and clear input field');
    });
  })
});

test('Task Count', function(assert) {
  visit('/');

  andThen(() => {
    var total = find('#todo-list li label').length;
    var completed = find('#todo-list li label.completed').length;
    assert.equal(find('#todo-count strong').text(), (total-completed).toString()+' item left', 'Number and incomplete task match');
  });
});

test('Item Destroy', function(assert) {
  visit('/');
  
  andThen(() => {
    var count = find('#todo-list li label').length;
    click('#todo-list li:last button.destroy');
    
    andThen(() => {
      assert.equal(find('#todo-list li label').length, count - 1, 'Item Destroyed');
    });
  });
});

test('Toggle Task completed', function(assert) {
  visit('/');
  fillIn('input#new-todo', 'Haha lol');
  keyEvent('input#new-todo', 'keydown', 13);
  
  andThen(() => {
    var completed = find('#todo-list li label.completed').length;
    click('#todo-list li:last input.toggle');

    andThen(() => {
      assert.equal(find('#todo-list li label.completed').length, completed+1, 'Number of task completed increase');
    }); 
  });
});

test('Toggle All Task completed', function(assert) {
  visit('/');
  click('#toggle-all');

  andThen(() => {
    if (find('input[type=checkbox]:checked').length){
      assert.equal(find('#todo-list li label.completed').length, find('#todo-list li label').length, 'All task completed');
    } else {
      assert.equal(find('#todo-list li label.completed').length, 0, 'All task incompleted');
    }
  });
});

test('Click Clear completed', function(assert){
  visit('/');
  click('#clear-completed')
  
  andThen(() => {
    assert.equal(find('#todo-list li label.completed').length, 0, 'All completed task cleared');
  })
});

test('Active List', function(assert) {
  visit('/actives');

  andThen(() => {
    assert.equal(find('#todo-list li label.completed').length, 0, 'Active task only shown');
  });
});

test('Completed List', function(assert) {
  visit('/');
  fillIn('input#new-todo', 'Holi holi holi');
  keyEvent('input#new-todo', 'keydown', 13);
  click('#todo-list li:last input.toggle');

  andThen(() => {  
    visit('/completes');

    andThen(() => {
      assert.equal((find('#todo-list li label.completed').length) > 0, true, 'Complete Task only shown');
    });
  });
});