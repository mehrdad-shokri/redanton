# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Danton.Repo.insert!(%Danton.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Danton.Repo.delete_all Danton.User
Danton.User.changeset(%Danton.User{}, %{name: "Test User", email: "testuser@example.com", password: "secret", password_confirmation: "secret"})
|> Danton.Repo.insert!

Danton.Repo.delete_all Danton.Comment
Danton.Repo.delete_all Danton.Post
Danton.Repo.delete_all Danton.Channel
Danton.Repo.delete_all Danton.Club


# Make Clubs (2)

clubs = [
	%Danton.Club{name: "Nomitch Fam", description: "link share for the family"},
	%Danton.Club{name: "Brain Food", description: "let's share some interesting stuff"}
]

Enum.each(clubs, fn (club) -> Danton.Repo.insert(person) end)

# Make Channels

# last_club = Danton.Club |> Ecto.Query.last

channels = [
	%Danton.Channel{name: "Articles", description: "channel for articles of interest", club_id: 1},
	%Danton.Channel{name: "Videos", description: "videos that might be of interest", club_id: 1},
	%Danton.Channel{name: "Music", description: "music that might be of interest", club_id: 1},
	%Danton.Channel{name: "News", description: "news stories that might be of interest", club_id: 1},
]

Enum.each(channels, fn (club) -> Danton.Repo.insert(person) end)

# Make Posts (2 per channel)

