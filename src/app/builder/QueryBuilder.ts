/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query, SortOrder } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    // console.log({queryObject})

    //filtering
    const excluedes = [
      'search',
      'searchTerm',
      'sort',
      'sortOrder',
      'limit',
      'page',
      'fields',
      'minPrice',
      'maxPrice',
    ];
    excluedes.forEach((el) => delete queryObject[el]);
    

    const filterQuery: Record<string, unknown> = { ...queryObject };
    if (this.query.minPrice || this.query.maxPrice) {
      
      filterQuery.price = {};
      if (this.query.minPrice) {
        (filterQuery.price as any).$gte = Number(this.query.minPrice);
      }
      if (this.query.maxPrice) {
        (filterQuery.price as any).$lte = Number(this.query.maxPrice);
      }
    }
  

    this.modelQuery = this.modelQuery.find(filterQuery as FilterQuery<T>);

    return this;
  }

  sort() {
    const sortBy = (this?.query?.sort as string) || 'createdAt'; // Default sortBy
    const sortOrder = this?.query?.sortOrder === 'desc' ? -1 : 1; // Default ascending order

    const sortQuery: Record<string, number> = {};
    sortBy.split(',').forEach((field) => {
      sortQuery[field.trim()] = sortOrder;
    });

    this.modelQuery = this.modelQuery.sort(
      sortQuery as { [key: string]: SortOrder },
    );
    return this;
  }
  sortOrder() {
    const validSortOrder = this?.query?.sortOrder === 'desc' ? -1 : 1;
    // console.log(validSortOrder)
    this.modelQuery = this.modelQuery.sort({ createdAt: validSortOrder });

    return this;
  }
  paginate() {
    const limit = Number(this?.query.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  fieldsLimiting() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
