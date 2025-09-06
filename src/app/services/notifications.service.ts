import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    #closedNotifications = signal<string[]>([]);
    closedNotifications = this.#closedNotifications.asReadonly();

    remove(type: string) {
        this.#closedNotifications.update((prev) => prev.filter((t) => t !== type));
    }

    clearAll() {
        this.#closedNotifications.set([])
    }

    isNonEmpty() {
        return this.#closedNotifications().length > 0;
    }

    add(type: string) {
        this.#closedNotifications.update((prev) => ([...prev, type ]));
    }
}