@login
Feature: Vérifier l'authentification

Vérifer l'authentification avec des coordonnées utilisateurs valide et invalide

 /* Etape se repétant à chaque test */
Background:
    Given je navigue vers la page "https://practice.expandtesting.com/notes/app/login"

    @valid
    Scenario: Vérifier avec coordonnée utilisateur valide
        When J'entre l'email "playwrighttest3@gmail.com"
        And J'entre le mot de passe "123456"
        And Je clique sur le bouton Login 
        Then Verifier la présence du mot "MyNotes"


    @invalide
    Scenario Outline: Vérifier avec coordonnée utilisateur invalident
        When J'entre l'email "<email>"
        And J'entre le mot de passe "<password>"
        And Je clique sur le bouton Login 
        Then Verifier la présence du message "<messagErreur>"

        Examples:
            | email                            | password          | messagErreur                                             |
            | playwrighttest3@gmail.com        | 123456789         | Incorrect email address or password                      |
            | testivalide@gmail.com            | 123456            | Incorrect email address or password                      |
            | playwrighttest3@gmail.com        |                   | Password is required                                     |
            |                                  | 123456            | Email address is required                                |
            |                                  |                   | Email address is required, Password is required          |