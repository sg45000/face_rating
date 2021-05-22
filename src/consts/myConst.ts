export class LineConsts {
  static WebhookEvent = {
      POSTBACK: 'postback',
      MESSAGE : 'message',
      FOLLOW  : 'follow'
  }
}

export enum MessageType {
  TEXT = 'text'
}

export enum REPOSITORY {
  LINE_USER = 'line_user',
  QUESTION_CHOICES = 'question_choices',
  QUESTIONS = 'questions',
  RANDOM_MESSAGES = 'random_messages',
}

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
