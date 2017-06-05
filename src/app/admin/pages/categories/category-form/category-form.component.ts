import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {Category} from '../../../../models/category';
import {CategoriesService} from '../../../../services/categories.service';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})

export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  create = true;
  title: string;
  loading = false;
  category: Category = new Category();

  rules = {
    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    description: ['', [
      Validators.maxLength(255)
    ]],
  };

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _categories: CategoriesService) {
    this.form = formBuilder.group(this.rules);
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.title = id ? 'Edit Category' : 'New Category';
      if (id) {
        this._categories.get(id)
          .subscribe(
            category => {
              this.category = category;
              this.create = false;
            },
            response => {
              console.log(response);
            }
          );
      }
    });
  }

  public save() {
    this.loading = true;
    let result;
    const userValue = this.form.value;

    if (this.create) {
      result = this._categories.add(userValue);
    } else {
      result = this._categories.update(this.category._id, userValue);
    }

    result.subscribe(
      data => {
        this.router.navigate(['admin/categories']);
      },
      error => {
        this._alert.error(error.json());
        this.loading = false;
      }
    );
  }

}
