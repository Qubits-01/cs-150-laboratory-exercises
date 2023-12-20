import gleam/int
import gleam/list
import lustre
import lustre/element.{type Element, text}
import lustre/element/html.{button, div, h1}
import lustre/event.{on_click}

type Model {
  GamePage(round: Int, correct_num: Int, msg: String)
  ResultsPage(is_winner: Bool)
}

fn init(_) -> Model {
  let n = int.random(100) + 1
  GamePage(round: 1, correct_num: n, msg: "")
}

type Msg {
  MsgGuess(number: Int)
  MsgReset
}

fn update(model: Model, msg: Msg) -> Model {
  case model, msg {
    ResultsPage(_), MsgReset -> init(0)

    GamePage(round, correct_num, _msg), MsgGuess(number) -> {
      let new_msg = case number == correct_num {
        False ->
          case number < correct_num {
            True ->
              int.to_string(number)
              <> " is too low! (from previous round)"
            False ->
              int.to_string(number)
              <> " is too high! (from previous round)"
          }
        _ -> ""
      }
      case round <= 7 {
        True ->
          case number == correct_num {
            True -> ResultsPage(is_winner: True)
            False ->
              case round == 7 {
                True -> ResultsPage(is_winner: False)
                False ->
                  GamePage(
                    round: round
                    + 1,
                    correct_num: correct_num,
                    msg: new_msg,
                  )
              }
          }
        False -> ResultsPage(is_winner: False)
      }
    }

    _, _ -> model
  }
}

fn make_button(number: Int) {
  button([on_click(MsgGuess(number: number))], [
    text(
      number
      |> int.to_string(),
    ),
  ])
}

fn view(model: Model) -> Element(Msg) {
  case model {
    ResultsPage(is_winner) -> {
      div([], [
        h1([], [
          text(case is_winner {
            True -> "You win!"
            False -> "You lose!"
          }),
        ]),
        button([on_click(MsgReset)], [text("Reset")]),
      ])
    }

    GamePage(round, _correct_num, msg) -> {
      let buttons =
        list.range(1, 100)
        |> list.map(make_button)
      let round_text = "Round: " <> int.to_string(round)
      let msg_text = "Clue: " <> msg
      div(
        [],
        list.concat([
          [h1([], [text(round_text)]), h1([], [text(msg_text)])],
          buttons,
        ]),
      )
    }
  }
}

pub fn main() {
  let app = lustre.simple(init, update, view)
  let assert Ok(_) = lustre.start(app, "[data-lustre-app]", Nil)
  Nil
}
