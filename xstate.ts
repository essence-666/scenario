import { createMachine, assign } from 'xstate';

export const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHpZgC4H0CuaBOm6AlgLZgBeA9gHZgB0AqvgJIQA2YAxAMoYAEuMHj7EyVWgG0ADAF1EoAA6VYRYjXkgAHogBMAZgBsARjo6AHHoDsZgCw6dlqXpsGANCACeiI5YCsdAE4goLMLKQCjHRs9AF8Y91QMHHxCUgoaegAhSnQ6AAkAQ2p2MABhShISIog6UoALMABjAGtmagAzSgBBACNKbHQmIU5pOSQQJRU1ag1tBD0HQMsDX1WzIykpFaN3LwQVvVNLOwC9M4WjILiEtCxBAlF02jps3MLijnLK6tqGlrbOr1+oN8CMjGNFMpVER1OM5gtLEsVmsNltfDtPIhQod9HopL4DJY9GYAlIdAZriBEncUo9xFkcvlqp8KlViox8IVYAApShEWgQACyYAw-KgsBGsg0k2hsNAcws-mWOiCxwCBik1gCu0QBhcdDMvlOBjxUlsOh8lOpySEqTEGRejPeJS+bJqQzwXN5-MgwtF1HFYIhEyh01mWL0SoMKoCao1Wp1CGWhwCoXJvmWNl8ZqMVtuNoeaXpjrezLKrJ+Hq5ABVKN7qH7iAHYAAxIh4WDoTiaTsFdD0Artft4AAU2akAEpONb7nangzSx9y992VWCrBa-XG2LW+3O6NpaGYTM4d4DCalhEfITDL4bNrMQg03R72aDAF0xr8XmkrO6Q7XiZJdXR+XgQSEasiwybte37OhB2HMdNinGdaSg55AOdFkVxqMCPUg+1JClcYZTDU8ECMc8U0sK9liJFZ70TPUDDoIwfB8VZIzY2MfxpW1-wwp0yxA1dOXXWtSjwMA+zAAAFPAiAANxk+o+wAdVUOpXhg9AZPgochCQydp3zP90IXICXQrUShBrShJOk-t5KUlS6nUzTXgPEijzlLQzwvWNaJvBiHz2ZNTBcTUzBVSItl4gs52LWTsB6NgiEaVTcgI+dyg6dsqmmHS9IQwzxxQ0y0MI+hktS9LMrobL6Vy9p8r7Y8vMhKZj3DBBfB0RN1joBYYr6vqjCzCl4ipCr+PMugarSjK3Ky8ywOa1rCp7XS4JK0cypM39KvneaUsW+rGoyNaaBavACva4jOtlE95V0QwTHMKxzQcJwXCY-RTCMSM8VGwkbEseKzKqk7aqWvs6C3EUmygeSKgULstuKgy9uQg6+MLKGFrq5b4b5BtEbFFGSDRjqQy63y5n0YxTAsaw7G+5w3EfUlEQcDULWOaM6Iho6ktOom4ec5T+0yym0aKnasaM8rDtmgmxdh3JJdcvtZfQGnSO68jGfelmvscDnE3CqJ42iiIdDiylqEoCA4A0VDVfnQ86eevyEAAWnsRM-f8YJTkNM5jCJBZhY94sPVYDgvaenqdFWGwDUsPxzEo-RTkto06DTwl7CzY0zBj-HjteJOyJehByUTGw2JfEkMxJSwHBsMGK8SgChOA6yIBrw26+ORvUwNSJogcXxDU1Qke4EiysOXN1fiaVoOm6PoBg9Yf6e8QPHxWRENSzbFnAWDNF7mzDhMHjlbPXetfXJ5t959uYjRMJwLTJY59DogxHsbYrESQrDMJsAIfVlg3yhnfAeOFH6enEnWUm25mxtg7OgD+PUMw6DoGiM00DoHvl8HoAag1xrmnGkYMaUgbBwKrv3KySC8L4AurQXB5E2JSBMKHQkqZ7xmEsImWeLFAZ3i2CI440cpru0rsWBBrC15rg3PZKSMktbS2WhpdAWkcjcLrmxaKhcHB4hETYCwZwzCWyZqSQweIu45mvvImaiiHSEw1kY32PgzAsScSaLMxJDAGFsY+U0rFeZ8PHHQxhbiVYeOeF4+q8kwCKRhLgYUsBYAFBgPAby3seqXFMSqGKTg-B8JsImYkiIsz4kolnGMRImGixhudcy61bptV8gbA+FF250BNDRZETg7yGkblmQINgoEiL4WafxsQEl417sk9WHSqpXTyt02utNk48IsOnQJzhyEWHPOEvYGYWL2GRHiYu+IAitM8es4mCN-TIzwKjHBhT9nGICHYQuhpQj4nIZGC0A0CSmAiHqQ0qZyQiKeWs9pxNtFlGWrrHxcwjCWNMJsFwQTzwzN8JbckhCGn-P0BadEk04hAA */
  id: "/set_user_timezone",
  initial: "UserIdle",
  context: {
    userTimezone: null,
    meetingTime: '2024-06-30T10:00:00Z', // base meeting time in UTC
  },
  states: {
    UserIdle: {
      on: {
        "Set user timezone": {
          actions: 'setUserTimezone',
          target: "PublicChat.TimezoneConfirmation"
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
                  target: "SetUserTimezone",
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
                  target: "#/set_user_timezone.PublicChat.JoinMeetingPrompt",
                }
              }
            },
            SetUserTimezone: {
              entry: 'setUserTimezone',
              after: {
                "500": {
                  target: "#/set_user_timezone.PublicChat.TimezoneSetConfirmation",
                }
              },
              description: "- Set timezone for this User in this Public chat.\n- Update scheduled reminders for today's daily meeting if the User participates in today's meeting"
            },
            UserHasToCreatePrivateChatWithBot: {
              after: {
                "500": {
                  target: "#/set_user_timezone.PublicChat.PrivateChatPrompt",
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
        TimezoneConfirmation: {
          description: "\"/set_user_timezone <timezone>\"\n- <timezone> - the user's timezone, e.g. UTC+2.",
          after: {
            "500": {
              target: "#/set_user_timezone.Bot.HandleCommand",
            }
          }
        },
        TimezoneSetConfirmation: {
          description: "Reply:\n\n\"OK, I've set your timezone to <timezone>. I'll adjust reminders for our daily meetings accordingly.\"",
          after: {
            "500": {
              target: "#/set_user_timezone.UserIdle",
            }
          }
        },
        JoinMeetingPrompt: {
          description: "Reply:\n\n\"You have to join daily meetings first!\n\nUse the /join command.\"",
          after: {
            "500": {
              target: "#/set_user_timezone.UserIdle",
            }
          }
        },
        PrivateChatPrompt: {
          description: "Reply:\n\n\"You should first create a Private chat with <bot> (it's me).\"",
          after: {
            "500": {
              target: "#/set_user_timezone.UserIdle",
            }
          }
        }
      }
    }
  }
});
