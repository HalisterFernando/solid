// ReadingTracker.ts

import EmailNotification from './EmailNotification';
import Notificator from './Notificator';
import PhoneNotification from './PhoneNotification';

export default class ReadingTracker {
  private readingGoal: number;
  private booksRead: number;
  notificator: Notificator;
  constructor(readingGoal: number, notificator: Notificator) {
    this.readingGoal = readingGoal;
    this.booksRead = 0;
    this.notificator = notificator
  }

  trackReadings(readsCount: number): void {
    this.booksRead += readsCount;
    if (this.booksRead >= this.readingGoal) {
      this.notificator.sendNotification(
        'Congratulations! You\'ve reached your reading goal!',
      );
      return;
    }
    this.notificator.sendNotification('There are still some books to go!');
  }
  // Aqui viriam mais métodos, que fogem o escopo deste exercício
}

const emailTrack = new ReadingTracker(9, new EmailNotification('halisterfernando@hotmail.com'))
const phoneTrack = new ReadingTracker(9, new PhoneNotification(988590680))
emailTrack.trackReadings(9)
phoneTrack.trackReadings(8)