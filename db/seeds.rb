# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.reset_pk_sequence
Song.destroy_all
Song.reset_pk_sequence
InterestedSong.destroy_all
InterestedSong.reset_pk_sequence

User.create(name: 'Brendan', email: 'Brendan@Brendan.com', password: '12345')
Song.create(user_id: 1, title: 'Creep', artist: 'Radiohead', genre: 'Rock', year_learned: 2010, my_ability_level: 9, singable: true, lyrics: 'when you were here before', tabs: 'test tabs', notes: 'test notes', recording: 'test recording link')
InterestedSong.create(user_id: 1, title: 'Aint no sunshine', artist: 'unknown', genre: 'notsure')
puts 'Done Seeding!'