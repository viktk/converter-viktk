// == Import npm
import React from 'react';

// == notre fichier de style
import './app.scss';

// == Import de nos composants custom
import Header from 'src/components/Header';
import Lists from 'src/components/Lists';
import Footer from 'src/components/Footer';
import Toggler from 'src/components/Toggler';

// == notre fichier de données
import dataDevise from 'src/data/currencies';

// == Composant version afficher/cacher la liste avec la class
class Converter extends React.Component {
  // dans un composant sous forme de classe
  // si l'on veut ajouter un state (état local)
  // on doit le faire dans le constructeur
  // le constructeur prend les props
  constructor(props) {
    // le constructeur "remonte" les props au parent (React.Component)
    // grace au mot clé super
    super(props);

    // et enfin, nous pouvons déclarer notre state
    // grace à this.state
    this.state = {
      isListOpen: false,
      selectedDevise: 'Euro',
      search: '',
      amount: 1, // valeur afficher par défaut
    };

    // on a besoin d'associer explicitement le contexte (this) a la méthode
    // handleToggleClick
    // ainsi, si on "sort" handleToggleClick, son contexte viendra avec
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchAmount = this.handleSearchAmount.bind(this);
  }

  // exécuté au rendu initial du composant
  componentDidMount() {
    document.title = `Conversion Euro/${this.state.selectedDevise}`;
  }

  // exécuté a chaque nouveau rendu
  // 2 params : les anciennes props et l'ancien state
  // les paramètres ont un ordre "(prevProps, prevState)"
  // par convention, si on utilise pas un paramètre, on écris "_", comme suivant :
  componentDidUpdate(_, prevState) {
    // si la devise à changé
    if (prevState.selectedDevise !== this.state.selectedDevise) {
      // on modifie le titre
      document.title = `Conversion Euro/${this.state.selectedDevise}`;
    }
  }

  // appelé lorsque on clic sur le "="
  handleToggleClick() {
    // pour modifier le state
    // on appelle SYSTEMATIQUEMENT la méthode this.setState
    // il est interdit de modifier this.state directement
    this.setState({
      // on donne a setState, les clés que l'on veut modifier
      // ici, on inverse la valeur actuelle de isListOpen, avec un !
      // et on met le résultat dans isListOpen, que l'on donne a setState
      isListOpen: !this.state.isListOpen,
    });
  }

  // appelé au clic sur une devise
  handleListClick(newDevise) {
    this.setState({
      selectedDevise: newDevise,
    });
  }

  // fonction appellée lorsque le champ controlé de recherche (dans Lists) change
  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  // modification du champ controlé pour le baseAmount
  // ne faites pas trop gaffe a l'histoire du null
  handleSearchAmount(event) {
    // version ternaire
    // const nV = Number.isNaN(event.target.valueAsNumber) ? null : event.target.valueAsNumber

    let newValue;
    // si le nombre n'en est pas un
    if (Number.isNaN(event.target.valueAsNumber)) {
      // je vais donner null a setState
      newValue = null;
    }
    else {
      // sinon, on touche a rien
      newValue = event.target.valueAsNumber;
    }

    this.setState({
      amount: newValue,
    });
  }

  // une méthode qui renvoie les devises filtrées
  // selon le prédicat de recherche
  getFilteredDevises() {
    // on filtre nos devises
    return dataDevise.filter(
      // on regarde que la devise contienne ce qui été écrit
      // dans le champ de recherche
      (list) => list.name.toLowerCase().includes(
        this.state.search.toLowerCase(),
      ),
    );
  }

  makeConversion() {
    // on commence par trouver la devise choisie
    // dans le tableau de devises
    const foundDevise = dataDevise
      .find((devise) => devise.name === this.state.selectedDevise);

    // on fait le calcul taux * montant
    const result = foundDevise.rate * this.state.amount;

    // on renvoie le tout
    return Math.round(result * 100) / 100; // arrondir la décimal à 2
  }

  // la méthode render sera appelée lorsqu'il faut redessiner le composant
  // react se charge d'appeller render au bon moment
  // c'est a dire quand les props, ou le state changent
  render() {
    // dans render, on renvoie le meme JSX qu'avant, rien ne change ici
    return (
      <div className="app">
        <Header
          searchValue={this.state.amount}
          onAmountChange={this.handleSearchAmount}
        />
        <Toggler
          isOpen={this.state.isListOpen}
          onToggle={this.handleToggleClick}
        />
        {this.state.isListOpen && (
          <Lists
            searchValue={this.state.search}
            onSearchChange={this.handleSearchChange}
            devises={this.getFilteredDevises()}
            onListClick={this.handleListClick}
          />
        )}
        <Footer devise={this.state.selectedDevise} amount={this.makeConversion()} />
      </div>
    );
  }
}

// == Export
export default Converter;
