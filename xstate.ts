import { createMachine, assign } from 'xstate';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0AOYBOsA9gHYCGANphKQJbkCemeYAtjcRPjvjYRAHQBVNHgCSEcmADEAZQwACdAAsw85mw755uPLwgBtAAwBdRKGyFYNdL2JmQAD0QAmAMwAWZ-wCMrw74BOQwAOZwA2APdggBoQekRvAHYAVn5IxIDvZPcAyOTw5wBfQtjUDG4CEgoqWgYmVnZOPAq9IRFxSVkFAFcRRRoWMAAvEjAjUyQQCysbEnsnBGdkxMT+YMNE5yz-RM9EsNj4hDCw935Dd09k4PdXSO9nYOLStCwdIjJKajpGdUauHStABChHQ-AAEqQOJIAMKEFgsKECGEqADGAGtRMQAGaEACCACNCN10MJ8FJxvZptZbPNEK4lj5kt5DK5khtgq5Eg9kodEGFkq5+M5ds4Aq4JQyiiUQGU3vgPtVvnU-ppmoC+PwQWDIdCwHCEUj+CiwBisbjCcTSSIKd4JuZLDS5pMFgzUlkWWyOVyeXyEMFOcKJYZkmFEq5gkEls9Za8KoqvrVfg01S1NdqIUjYfDERw2vhIbAAFKEdiQACyYAw7CgsApJipjtmdhdiFCYX47hOD0efnZ2T9pw7wWS4rCfhCnmlL3K7yqiZ+9Q0TTTAgzuok+pzRrJeELJbLEEr1eItdt9qmTdprf94U73ecvZDIfcfv2QoCAfCy1O7OC3hjOV43nGpF1VFcNTXUFMz1A1cwEXdCwAFUIA9iGPGxT1gAAxGgCHQKQHFgdBSHQMB+FIbEyLwAAKdlDAASikIC50+UCVRTCCeHTaCN2zQ080Q0hYBQtCMJrHC8OIylJmpZs6QQbwBW8YVvGCRJ-C7MJDBDP0v07IJggib9tIuQC41YpUkyXf51W4qCdSzLcBIEOR0AAJU4-AAAV7MI4jSPIyjqLonSmJYhUQOVZNlwBeytV4py4KNNzPNivBfN0PgZIdGZr1ABYlOZVT1M0k4dN5OJ+S7HwkiSZJBWZbxP3M2dIrY6KbNTSCEsc2Dt0EkRkMIGFmEC7zdAAN0ClFSIAdWsJRtX8kiyIoqj8FCxjmIs9qrLAry7KyhyYM3ZLBoLYSUNGsBxqmmalHmxbtRyy88udAqEmUkqNO8LSKrfcdhS7DkxQeQwwla+VKg66zwLi47+G87oCXIGhUVmsE4RxPCWEyvQVsC9aQvo8Ldph-aOPS1ckZRtGMcerGSGxXH8eyhtZKvD7HEQfI9JUqVMnyfI-tDKHgNhg7qZ65HUfRzGkfstzsZZvBEWbQm1uCzbSZ2tqKYXKnbJp2X6YVtmIGV5ncdI2xXrk-KecWDwvF8fw7hCcJIhiKrjjcVS2T7JYw3cRJxcsw2YuNmW6flxn+DEqtMKgCb4WwAiiNWoKNto3WIoN9io+6+LTbj0iE9LdCk5rVOWHT+2uZbT7nc8Hw-ECT2IiiP0glWEVtK2XYwn7sOZXzhNC66rjEdLhny4mmhprIzHa-TzXs5JsK9ehifOvho7Wln837uXxnV-QBv3qbp23Fbt2O-bb3AaFZwQcSUJMmcCHihlYg+Dgew48opw0OquRsV8FIAFpHx+kgakXIuR9jciMkkSI7hw57UjlPBGrRdwdDAOAp018FhLAjJ2P6I52RuFDAESqRx9hnHcKyccFwmH-mWBggue9QE9W1IQ+SN5wh+ncN4FSURaEiJuCyUMo8Zw72AVLaO8V1xJQGhAfhjsFi7GEZ+NYDxQ63FHK-S4nDd4gOlsoxK-UXLGjRJiHE+IiQkl3Bo7mhUYG+wFKsbS7hricg8G6AIpiFFG2LojFR1j4L5j3MJNCFZq5YVccQ3mgo1gilfmKCIywLiDluPwFI3JTifhuGw4JktQnT2BFYs6ajonDUTieWsuF8JJIUqGDsFxIinH-F-AMAQ9L-h8FETwf0shbH8GUymRdKk8T6jUmxqVDoW1aTeFkkYgy0OZCscMXJXB+muB2Xw2QIbqV2FKSZWD940wifMqJQkRIjTGmRBeS99SMwWsoPhnMIGrKSF4cIERDCPF8Qct8Rl+AeHWAGG4IZkgXMnlcmOcs57oBWc3JIYYmSGE-OKSIQLNh+gnD4EU1xPAeFEdOWM+szGKLCYfWOKKkbMEmrwXolZYCwFIDAeA3yiEKWaqcWq1x+6bN8c4Ql6lOz9iUikR8iDXDwu4RYmeDKFYq1ZvZNFTs1IBG8csHIYZ8g3AOL7S48CmHYtKmsoyCqx7kxpRUnBmoj7xwtlbHGatbbcwdm4hI7CsU4ruEw9J+z9jCm-IKCGmwQxBLtdSkJ0ynUCBdeXBpydz5asKuKQwaQlibFDo+DIEM9KhmFJkbpo52zqUVeYpRKrkXH0Xg9UiGbeUCPRUZAI5wuQaTCEpJIHgTX0IZPwMMak+0VQ0qOH+hQgA */
  id: "/set_personal_daily_reminder_period",
  initial: "UserIdle",
  context: {
    userTimezone: null,
    reminderPeriod: null, 
    meetingTime: '2024-06-30T10:00:00Z', 
  },
  states: {
    UserIdle: {
      on: {
        "Set the reminder period": {
          actions: 'setReminderPeriod',
          target: "PublicChat.ConfirmPeriod"
        },
        "Set user timezone": {
          actions: 'setUserTimezone'
        }
      }
    },
    Bot: {
      states: {
        HandleCommand: {
          initial: "CheckInfoAboutUser",
          states: {
            CheckInfoAboutUser: {
              always: [
                {
                  target: "UserHasJoinedMeetings",
                  cond: "userHasJoinedMeetings"
                },
                {
                  target: "UserHasToJoinMeetingsFirst",
                }
              ]
            },
            UserHasJoinedMeetings: {
              always: [
                {
                  target: "SetReminderPeriod",
                  cond: "userHasPrivateChatWithBot"
                },
                {
                  target: "UserHasToCreatePrivateChatWithBot",
                }
              ]
            },
            UserHasToJoinMeetingsFirst: {
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.PublicChat.JoinMeetingPrompt",
                }
              }
            },
            SetReminderPeriod: {
              entry: 'setReminder',
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.PublicChat.PeriodSetConfirmation",
                }
              },
              description: "- Set reminder period for this User in this Public chat to <period> minutes.\n- Update scheduled reminders for today's daily meeting if the User participates in today's meeting"
            },
            UserHasToCreatePrivateChatWithBot: {
              after: {
                "500": {
                  target: "#/set_personal_daily_reminder_period.PublicChat.PrivateChatPrompt",
                }
              }
            }
          }
        }
      }
    },
    PublicChat: {
      initial: "PreviousMessages",
      states: {
        PreviousMessages: {},
        ConfirmPeriod: {
          description: "\"/set_personal_daily_reminder <timezone>\"\n- <timezone> - a hours and minutes + by utc, etc: utc+3:30, utc-2:00",
          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.Bot.HandleCommand",
            }
          }
        },
        PeriodSetConfirmation: {
          description: "Reply:\n\n\"OK, I'll remind you in our chat each meeting time corresponding to your timezone after the start of a daily meeting to reply to missed daily meeting questions.\"",
          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.UserIdle",
            }
          }
        },
        JoinMeetingPrompt: {
          description: "Reply:\n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",
          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.UserIdle",
            }
          }
        },
        PrivateChatPrompt: {
          description: "Reply:\n\n\"You should first create a Private chat with <bot> (it's me).\"",
          after: {
            "500": {
              target: "#/set_personal_daily_reminder_period.UserIdle",
            }
          }
        }
      }
    }
  }
});
