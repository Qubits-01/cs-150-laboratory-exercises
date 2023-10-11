import flet as ft


def main(page):
    def increment(_):
        nonlocal counter

        counter += 1
        text.value = str(counter)

        page.update()  # Updates the screen with any new content

    counter = 0

    text = ft.Text(str(counter))
    button = ft.IconButton(icon="arrow_circle_up", on_click=increment)

    page.add(text)  # Adds the counter text on screen
    page.add(button)  # Adds the increment button on screen


ft.app(target=main)  # Executes `main(page)` and runs an infinite loop
# (event loop; out of scope for now)
