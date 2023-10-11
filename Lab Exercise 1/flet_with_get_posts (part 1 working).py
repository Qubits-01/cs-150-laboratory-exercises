import flet as ft
import praw


reddit = praw.Reddit(  # Before submission, revert all strings below to "..."
    client_id="...",  # Change this to your Client ID
    client_secret="...",  # Change this to your Client Secret
    password="...",  # Change this to your Reddit account password
    user_agent="...",  # Change this to "testscript by u/(your username)"
    username="...",  # Change this to your username
)


def main(page):
    page.title = "CS 150 23.1 Lab 1"
    page.vertical_alignment = ft.MainAxisAlignment.CENTER  # For layouting; ignore

    controls = []

    for post in reddit.front.new():

        def upvote_closure(post):
            def upvote_arrow_click(_):
                print(f"Upvoting post: {post.title}")
                post.upvote()

            return upvote_arrow_click

        def downvote_closure(post):
            def downvote_arrow_click(_):
                print(f"Downvoting post: {post.title}")
                post.downvote()

            return downvote_arrow_click

        upvote_arrow = ft.IconButton(
            icon="arrow_upward",
            icon_color="orange" if post.likes else "grey",
            on_click=upvote_closure(post),
        )

        score_text = ft.Text(
            str(post.score),
            color="orange" if post.likes else "blue" if post.likes is False else "grey",
        )

        downvote_arrow = ft.IconButton(
            icon="arrow_downward",
            icon_color="blue" if post.likes is False else "grey",
            on_click=downvote_closure(post),
        )

        controls.append(
            ft.Card(
                ft.Row(
                    [
                        ft.Column(
                            [
                                upvote_arrow,
                                score_text,
                                downvote_arrow,
                            ],
                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                            width=80,  # For layouting; ignore
                        ),
                        ft.Text(
                            post.title,
                            max_lines=2,  # For layouting; ignore
                            expand=1,  # For layouting; ignore
                        ),
                    ],
                ),
            ),
        )

    page.add(
        ft.ListView(
            controls,
            expand=1,  # For layouting; ignore
            spacing=10,  # For layouting; ignore
            padding=20,  # For layouting; ignore
        )
    )


ft.app(target=main)
