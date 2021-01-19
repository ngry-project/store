import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { StoreBase } from '../store/store-base';
import { CompareFunction, PredicateFunction } from '../types';
import { EntityCollection } from './entity-collection';

export class EntityCollectionStore<ID, TEntity, TCollection extends EntityCollection<ID, TEntity, any>>
  extends StoreBase<TCollection> implements OnDestroy {

  readonly ids: Observable<ReadonlyArray<ID>>;
  readonly entities: Observable<ReadonlyArray<TEntity>>;

  constructor(
    initial: TCollection,
  ) {
    super(initial);

    this.ids = this.state.pipe(
      map(state => state.ids),
    );

    this.entities = this.state.pipe(
      map(state => state.entities),
    );
  }

  ngOnDestroy(): void {
    this.complete();
  }

  add(entity: TEntity): void {
    this.next(this.snapshot.add(entity));
  }

  addMany(entities: Iterable<TEntity>): void {
    this.next(this.snapshot.addMany(entities));
  }

  insert(position: number, entity: TEntity): void {
    this.next(this.snapshot.insert(position, entity));
  }

  insertMany(position: number, entities: Iterable<TEntity>): void {
    this.next(this.snapshot.insertMany(position, entities));
  }

  delete(id: ID): void {
    this.next(this.snapshot.delete(id));
  }

  deleteMany(ids: Iterable<ID>): void {
    this.next(this.snapshot.deleteMany(ids));
  }

  remove(entity: TEntity): void {
    this.next(this.snapshot.remove(entity));
  }

  removeMany(entities: Iterable<TEntity>): void {
    this.next(this.snapshot.removeMany(entities));
  }

  clear(): void {
    this.next(this.snapshot.clear());
  }

  update(entity: TEntity): void {
    this.next(this.snapshot.update(entity));
  }

  filter(predicate: PredicateFunction<TEntity>): void {
    this.next(this.snapshot.filter(predicate));
  }

  sort(compare: CompareFunction<TEntity>): void {
    this.next(this.snapshot.sort(compare));
  }
}