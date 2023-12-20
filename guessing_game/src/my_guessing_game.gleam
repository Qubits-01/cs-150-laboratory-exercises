import gleam/int
import gleam/list
import lustre
import lustre/element.{type Element, text}
import lustre/element/html.{button, div, h1}
import lustre/event.{on_click}

type Player {
  Player1
  Player2
}

type Model {
  GamePage(n: Int, k: Int, turn: Player)
  WinPage(winner: Player)
}

fn init(_) -> Model {
  let n = 100 + int.random(10_000)
  // [100,10999] [100, 10000]
  GamePage(n: n, k: 2, turn: Player1)
}

type Msg {
  MsgChoseNumber(number: Int)
  MsgReset
}

fn update(model: Model, msg: Msg) -> Model {
  case model, msg {
    WinPage(_), MsgReset -> init(0)

    GamePage(n, k, turn), MsgChoseNumber(number) -> {
      let new_k = k * number
      case new_k >= n {
        True -> WinPage(turn)
        False ->
          GamePage(n: n, k: new_k, turn: case turn {
            Player1 -> Player2
            Player2 -> Player1
          })
      }
    }

    _, _ -> model
  }
}

fn make_button(number: Int) {
  button([on_click(MsgChoseNumber(number))], [
    text(
      number
      |> int.to_string(),
    ),
  ])
}

fn player_text(player: Player) -> String {
  case player {
    Player1 -> "Player 1"
    Player2 -> "Player 2"
  }
}

fn view(model: Model) -> Element(Msg) {
  case model {
    WinPage(winner) -> {
      div([], [
        h1([], [text(player_text(winner) <> " won")]),
        button([on_click(MsgReset)], [text("Reset")]),
      ])
    }

    GamePage(n, k, turn) -> {
      let buttons =
        list.range(2, 9)
        |> list.map(make_button)
      let n_text = "n: " <> int.to_string(n)
      let k_text = "k: " <> int.to_string(k)
      div(
        [],
        list.concat([
          [h1([], [text(n_text)]), h1([], [text(k_text)])],
          buttons,
          [h1([], [text(player_text(turn) <> "'s turn")])],
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
