import React from "react";
import { render, screen } from "@testing-library/react";
import { EditShopItem } from "./EditShopItem";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import axios, { AxiosResponse } from "axios";
import http from "../httpCommon";
jest.mock("../httpCommon");

const mockedHttp = http as jest.Mocked<typeof axios>;

const shopItemWithId = {
  id: "this-is-a-uuid",
  name: "item",
  description: "this is an item",
  price: 1.2,
  stock: 10,
};

test("fills form elements correctly with values from backend when called with id", async () => {
  mockedHttp.get.mockResolvedValue({ data: shopItemWithId } as AxiosResponse);

  render(
    <MemoryRouter initialEntries={["/shopItem/this-is-a-uuid"]}>
      <Routes>
        <Route path="/shopItem/:id" element={<EditShopItem />} />
      </Routes>
    </MemoryRouter>
  );
  expect(await screen.findByText(/^Edit Item "item"$/i)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(/^item$/i)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(/^this is an item$/i)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(/^1.2$/i)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(/^10$/i)).toBeInTheDocument();
});
