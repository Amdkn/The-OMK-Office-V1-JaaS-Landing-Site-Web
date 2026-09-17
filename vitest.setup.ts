import 'fake-indexeddb/auto';
import * as idb from 'idb-keyval';
// Setup dummy indexedDB for jsdom tests globally to prevent reference errors if they import idb directly
if (typeof indexedDB === 'undefined' && typeof window !== 'undefined') {
  const fakeIDB = require('fake-indexeddb');
  window.indexedDB = fakeIDB.indexedDB;
  window.IDBCursor = fakeIDB.IDBCursor;
  window.IDBCursorWithValue = fakeIDB.IDBCursorWithValue;
  window.IDBDatabase = fakeIDB.IDBDatabase;
  window.IDBFactory = fakeIDB.IDBFactory;
  window.IDBIndex = fakeIDB.IDBIndex;
  window.IDBKeyRange = fakeIDB.IDBKeyRange;
  window.IDBObjectStore = fakeIDB.IDBObjectStore;
  window.IDBOpenDBRequest = fakeIDB.IDBOpenDBRequest;
  window.IDBRequest = fakeIDB.IDBRequest;
  window.IDBTransaction = fakeIDB.IDBTransaction;
  window.IDBVersionChangeEvent = fakeIDB.IDBVersionChangeEvent;
}
